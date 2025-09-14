import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import WelcomeScreen from "@/components/quiz/welcome-screen";
import QuestionScreen from "@/components/quiz/question-screen";
import ResultsScreen from "@/components/quiz/results-screen";
import ProgressBar from "@/components/quiz/progress-bar";

interface QuizAnswers {
  question1?: string;
  question2?: string;
  question3?: string;
  question4?: string;
  question5?: string;
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'question' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [sessionId, setSessionId] = useState<string>('');
  const [personalizedMessage, setPersonalizedMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Gera um ID de sessão local
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Gera mensagem personalizada baseada nas respostas
  const generatePersonalizedMessage = (answers: QuizAnswers): string => {
    const messages = {
      organizacao: "Vejo que sua maior dificuldade é organizar ideias. Nosso ebook contém métodos práticos para estruturar seus textos de forma clara e eficiente.",
      argumentacao: "Argumentação é sua principal barreira. Nosso guia te ensina técnicas comprovadas para construir argumentos sólidos e convincentes.",
      gramatica: "Gramática está te preocupando. Nosso material inclui as regras essenciais explicadas de forma simples e prática.",
      coesao: "Coesão e coerência são pontos que você precisa melhorar. Temos estratégias específicas para conectar suas ideias de forma fluida.",
      repertorio: "Falta de repertório é sua dificuldade. Nosso ebook oferece um banco de referências atualizadas e como utilizá-las corretamente."
    };

    const planningMessages = {
      sempre: "É ótimo que você já tenha o hábito de planejar! Nosso método vai potencializar ainda mais sua organização.",
      'as-vezes': "Planejamento inconsistente pode te prejudicar. Vamos te ensinar uma metodologia rápida e eficaz.",
      nunca: "Escrever sem planejar é arriscado! Nosso guia tem técnicas de planejamento em apenas 5 minutos."
    };

    const timeMessages = {
      'mais-3h': "Seu dedicação é admirável! Vamos otimizar seu tempo de estudo com técnicas mais eficientes.",
      '1-3h': "Bom tempo de estudo! Nosso método vai maximizar o resultado dessas horas.",
      'menos-1h': "Pouco tempo de treino pode limitar seu progresso. Nosso guia ensina como treinar de forma mais eficiente."
    };

    const confidenceMessages = {
      'sempre-inseguro': "Entendo sua insegurança, é normal! Nosso guia vai te dar a confiança que você precisa com métodos testados.",
      'algumas-vezes': "Sua confiança varia com o tema? Nosso ebook te prepara para qualquer assunto com estratégias universais.",
      'nunca-inseguro': "Que ótimo que você se sente confiante! Vamos elevar ainda mais seu nível com técnicas avançadas."
    };

    const benefitMessages = {
      'aumentar-nota': "Foco na nota! Nosso método foi criado especificamente para atingir nota máxima no ENEM.",
      'ter-confianca': "Confiança é fundamental! Com nossa metodologia, você vai se sentir preparado para qualquer tema.",
      'tecnicas': "Você quer técnicas eficazes? Nosso ebook é 100% prático com estratégias comprovadas.",
      'economizar-tempo': "Otimização de tempo? Nosso método permite estudar de forma mais eficiente e certeira."
    };

    let message = "Com base nas suas respostas, identifiquei exatamente o que você precisa:\n\n";
    
    if (answers.question1) {
      message += "📝 " + messages[answers.question1 as keyof typeof messages] + "\n\n";
    }
    
    if (answers.question2) {
      message += "⏰ " + planningMessages[answers.question2 as keyof typeof planningMessages] + "\n\n";
    }
    
    if (answers.question3) {
      message += "🎯 " + timeMessages[answers.question3 as keyof typeof timeMessages] + "\n\n";
    }

    if (answers.question4) {
      message += "💪 " + confidenceMessages[answers.question4 as keyof typeof confidenceMessages] + "\n\n";
    }

    if (answers.question5) {
      message += "🏆 " + benefitMessages[answers.question5 as keyof typeof benefitMessages] + "\n\n";
    }

    message += "✨ Nosso Ebook 'Redação ENEM Nota 1000' foi criado especificamente para resolver essas dificuldades!\n\n";
    message += "🚀 Você receberá um método passo a passo, testado e aprovado, que já ajudou milhares de estudantes a conquistarem nota máxima.";

    return message;
  };

  // Função para rastrear interesse na compra (local)
  const trackPurchase = () => {
    // Aqui você pode adicionar analytics locais se desejar
    console.log('Interesse na compra registrado:', { sessionId, timestamp: new Date() });
  };

  const handleStartQuiz = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setCurrentStep('question');
    setCurrentQuestion(1);
  };

  const handleAnswerSelect = (questionNum: number, value: string) => {
    const newAnswers = { ...answers, [`question${questionNum}`]: value };
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Processa as respostas localmente
      setIsProcessing(true);
      
      // Simula um pequeno delay para melhor UX
      setTimeout(() => {
        const message = generatePersonalizedMessage(answers);
        setPersonalizedMessage(message);
        setCurrentStep('results');
        setIsProcessing(false);
      }, 1500);
    }
  };

  const handlePurchase = () => {
    trackPurchase();
    // Redireciona para seu link de venda (Hotmart, etc.)
    const checkoutWindow = window.open('https://pay.kirvano.com/b77691e3-1879-4f05-851b-d2769adc8c58', '_blank', 'noopener,noreferrer');
    if (checkoutWindow) {
      checkoutWindow.opener = null;
    }
    toast({
      title: "Redirecionando...",
      description: "Você será redirecionado para o checkout seguro.",
    });
  };

  const questions = [
    {
      question: "Qual é a sua maior dificuldade na redação do ENEM?",
      options: [
        { value: 'organizacao', label: 'Organização de ideias', icon: 'fas fa-list-ul' },
        { value: 'argumentacao', label: 'Argumentação', icon: 'fas fa-comments' },
        { value: 'gramatica', label: 'Gramática', icon: 'fas fa-spell-check' },
        { value: 'coesao', label: 'Coesão e Coerência', icon: 'fas fa-link' },
        { value: 'repertorio', label: 'Falta de repertório', icon: 'fas fa-book' },
      ],
    },
    {
      question: "Você costuma planejar seu texto antes de escrever?",
      options: [
        { value: 'sempre', label: 'Sempre - Eu sempre faço um rascunho', icon: 'fas fa-check-circle', color: 'text-green-500' },
        { value: 'as-vezes', label: 'Às vezes - Depende do tempo disponível', icon: 'fas fa-clock', color: 'text-amber-500' },
        { value: 'nunca', label: 'Nunca - Vou escrevendo direto', icon: 'fas fa-times-circle', color: 'text-red-500' },
      ],
    },
    {
      question: "Quanto tempo você dedica ao treino de redação por semana?",
      options: [
        { value: 'mais-3h', label: 'Mais de 3 horas - Treino bastante', icon: 'fas fa-fire', color: 'text-red-500' },
        { value: '1-3h', label: 'Entre 1 e 3 horas - Treino moderado', icon: 'fas fa-clock', color: 'text-amber-500' },
        { value: 'menos-1h', label: 'Menos de 1 hora - Treino pouco', icon: 'fas fa-hourglass-half', color: 'text-blue-500' },
      ],
    },
    {
      question: "Você já se sentiu inseguro(a) ao escrever sua redação?",
      options: [
        { value: 'sempre-inseguro', label: 'Sim, sempre - Fico muito nervoso(a)', icon: 'fas fa-frown', color: 'text-red-500' },
        { value: 'algumas-vezes', label: 'Sim, algumas vezes - Depende do tema', icon: 'fas fa-meh', color: 'text-amber-500' },
        { value: 'nunca-inseguro', label: 'Não - Me sinto confiante', icon: 'fas fa-smile', color: 'text-green-500' },
      ],
    },
    {
      question: "Qual seria o maior benefício de ter um guia passo a passo para a redação?",
      options: [
        { value: 'aumentar-nota', label: 'Aumentar minha nota no ENEM', icon: 'fas fa-chart-line', color: 'text-green-500' },
        { value: 'ter-confianca', label: 'Ter mais confiança na hora da prova', icon: 'fas fa-shield-alt', color: 'text-blue-500' },
        { value: 'tecnicas', label: 'Aprender técnicas eficazes', icon: 'fas fa-tools', color: 'text-purple-500' },
        { value: 'economizar-tempo', label: 'Economizar tempo de estudo', icon: 'fas fa-clock', color: 'text-amber-500' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 px-2 sm:px-4 bg-background relative overflow-hidden overflow-x-hidden dark">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-yellow-400/15 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tr from-purple-600/15 to-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-yellow-500/10 to-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-0 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-l from-yellow-400/12 to-purple-600/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500/15 to-yellow-400/12 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="quiz-container max-w-2xl mx-auto relative z-10">
        {currentStep !== 'welcome' && (
          <ProgressBar 
            currentQuestion={currentQuestion} 
            totalQuestions={5} 
          />
        )}

        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeScreen 
                onStart={handleStartQuiz}
                isLoading={false}
              />
            </motion.div>
          )}

          {currentStep === 'question' && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionScreen
                question={questions[currentQuestion - 1]}
                questionNumber={currentQuestion}
                selectedValue={answers[`question${currentQuestion}` as keyof QuizAnswers]}
                onAnswerSelect={(value) => handleAnswerSelect(currentQuestion, value)}
                onNext={handleNextQuestion}
                isLastQuestion={currentQuestion === 5}
                isLoading={isProcessing}
              />
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsScreen
                personalizedMessage={personalizedMessage}
                onPurchase={handlePurchase}
                isLoading={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
