interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">{currentQuestion}</span>
          </div>
          <span className="text-sm font-medium text-foreground" data-testid="text-progress">
            Pergunta {currentQuestion} de {totalQuestions}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="text-progress-percentage">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-4 overflow-hidden border border-primary/10">
        <div 
          className="progress-bar h-full rounded-full transition-all duration-800 ease-out relative"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-xs text-muted-foreground font-medium">
          {progress === 100 ? "Parabéns! Você completou o quiz!" : "Continue respondendo para ver seu resultado personalizado"}
        </span>
      </div>
    </div>
  );
}
