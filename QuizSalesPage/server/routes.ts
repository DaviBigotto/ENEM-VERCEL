import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema, QuizAnswers } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create quiz session
  app.post("/api/quiz/session", async (req, res) => {
    try {
      const sessionId = randomUUID();
      res.json({ sessionId });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Submit quiz answers
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const { sessionId, answers } = req.body;
      
      if (!sessionId || !answers) {
        return res.status(400).json({ message: "Session ID and answers are required" });
      }

      // Validate answers
      const validatedAnswers = QuizAnswers.parse(answers);
      
      // Generate personalized message
      const personalizedMessage = generatePersonalizedMessage(validatedAnswers);
      
      const quizResponse = await storage.createQuizResponse({
        sessionId,
        answers: validatedAnswers,
        personalizedMessage,
      });

      res.json({ 
        success: true, 
        personalizedMessage,
        responseId: quizResponse.id 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Track purchase initiation
  app.post("/api/quiz/purchase", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      const response = await storage.getQuizResponse(sessionId);
      if (response) {
        await storage.updateQuizResponse(response.id, {
          purchaseInitiated: new Date(),
        });
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get quiz statistics
  app.get("/api/quiz/stats", async (req, res) => {
    try {
      const stats = await storage.getQuizStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generatePersonalizedMessage(answers: any): string {
  let message = "Baseado nas suas respostas, ";
  
  // Analyze main difficulty
  const difficulty = answers.question1;
  switch(difficulty) {
    case 'organizacao':
      message += "percebo que sua maior dificuldade é <strong>organizar ideias</strong>. ";
      break;
    case 'argumentacao':
      message += "vejo que você precisa melhorar sua <strong>argumentação</strong>. ";
      break;
    case 'gramatica':
      message += "identifiquei que a <strong>gramática</strong> é seu principal desafio. ";
      break;
    case 'coesao':
      message += "percebi que <strong>coesão e coerência</strong> são seus pontos de atenção. ";
      break;
    case 'repertorio':
      message += "vejo que você precisa desenvolver seu <strong>repertório cultural</strong>. ";
      break;
  }

  // Add planning insight
  if (answers.question2 === 'nunca') {
    message += "Também notei que você não costuma planejar antes de escrever, o que pode estar limitando seu desempenho. ";
  } else if (answers.question2 === 'as-vezes') {
    message += "Vi que você às vezes planeja seu texto - com as técnicas certas, isso pode se tornar um hábito poderoso. ";
  }

  // Add training insight
  if (answers.question3 === 'menos-1h') {
    message += "Com menos de 1 hora de treino semanal, você tem muito potencial de melhoria! ";
  }

  message += "<br><br>Nosso ebook foi desenvolvido especialmente para estudantes como você, com <strong>técnicas práticas e comprovadas</strong> que já ajudaram milhares de alunos a conquistarem notas acima de 900 na redação do ENEM!";
  
  return message;
}
