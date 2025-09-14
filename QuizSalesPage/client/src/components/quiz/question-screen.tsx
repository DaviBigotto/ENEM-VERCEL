import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon: string;
  color?: string;
}

interface Question {
  question: string;
  options: Option[];
}

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  selectedValue?: string;
  onAnswerSelect: (value: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  isLoading: boolean;
}

export default function QuestionScreen({
  question,
  questionNumber,
  selectedValue,
  onAnswerSelect,
  onNext,
  isLastQuestion,
  isLoading
}: QuestionScreenProps) {
  return (
    <Card className="question-card p-8 animate-slide-in">
      <CardContent>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-full text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 animate-bounce-gentle">
            {questionNumber}
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight px-2 sm:px-0">
            {question.question}
          </h2>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              className={`option-button w-full p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-left transition-all duration-300 border-2 group ${
                selectedValue === option.value
                  ? 'border-primary bg-primary text-primary-foreground selected'
                  : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
              onClick={() => onAnswerSelect(option.value)}
              data-testid={`option-${option.value}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 flex-shrink-0 ${
                  selectedValue === option.value 
                    ? 'bg-white/20' 
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <i className={`${option.icon} text-sm sm:text-base md:text-lg ${option.color || (selectedValue === option.value ? 'text-white' : 'text-primary')}`}></i>
                </div>
                <span className="font-medium text-sm sm:text-base flex-1 break-words">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        {selectedValue && (
          <div className="mt-6 sm:mt-8 animate-fade-in">
            <Button
              onClick={onNext}
              disabled={isLoading}
              className="cta-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold w-full hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
              data-testid="button-next-question"
            >
              <span className="flex items-center justify-center text-sm sm:text-base">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    {isLastQuestion ? "Ver Meu Resultado" : "Próxima Pergunta"}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
