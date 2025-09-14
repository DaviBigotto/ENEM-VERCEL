import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Clock, Users, Play } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

export default function WelcomeScreen({ onStart, isLoading }: WelcomeScreenProps) {
  return (
    <Card className="question-card p-8 text-center animate-fade-in">
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary mx-auto mb-4 animate-float" />
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-pulse-slow"></div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Quer aumentar sua nota na redação do ENEM?
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed px-2 sm:px-0">
            Responda este quiz rápido e descubra como melhorar hoje mesmo! 
            São apenas 5 perguntas que vão te ajudar a identificar seus pontos de melhoria.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-secondary/50 to-secondary/30 p-6 rounded-xl mb-6 border border-primary/10 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4 transform hover:scale-105 transition-transform duration-300">
            <div className="bg-accent/10 p-2 rounded-full mr-3">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">Tempo estimado: 2 minutos</span>
          </div>
          <div className="flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-success/10 p-2 rounded-full mr-3">
              <Users className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm font-medium text-foreground">+5.000 estudantes já melhoraram suas notas</span>
          </div>
        </div>

        <Button 
          onClick={onStart} 
          disabled={isLoading}
          className="cta-gradient text-white px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-5 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden group w-full max-w-sm sm:max-w-md mx-auto"
          size="lg"
          data-testid="button-start-quiz"
        >
          <div className="flex items-center justify-center relative z-10">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm sm:text-base md:text-lg">
              {isLoading ? "Iniciando..." : "Começar Quiz Agora"}
            </span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
