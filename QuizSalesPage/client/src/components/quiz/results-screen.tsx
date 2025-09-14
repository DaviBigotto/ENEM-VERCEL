import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Shield, RotateCcw, Star, BookOpen, Check, Clock } from "lucide-react";

interface ResultsScreenProps {
  personalizedMessage: string;
  onPurchase: () => void;
  isLoading: boolean;
}

export default function ResultsScreen({ personalizedMessage, onPurchase, isLoading }: ResultsScreenProps) {
  const testimonials = [
    {
      rating: 5,
      text: "Consegui passar de 600 para 920 na redação! As técnicas são realmente eficazes.",
      author: "Maria S., aprovada na USP"
    },
    {
      rating: 5,
      text: "O ebook me deu a confiança que eu precisava. Agora escrevo sem medo!",
      author: "João P., aprovado na UFMG"
    }
  ];

  const features = [
    "Técnicas comprovadas de organização",
    "Exemplos práticos de redações nota 1000",
    "Guia completo de argumentação",
    "Checklist para revisão final"
  ];

  return (
    <div className="animate-fade-in">
      <Card className="question-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-success/10 to-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardContent className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-success mx-auto mb-3 sm:mb-4 animate-bounce-gentle" />
              <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-success/20 to-primary/20 blur-xl animate-pulse-slow"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent leading-tight">
              Quiz Concluído! 🎉
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-2 sm:px-0">Veja seu perfil personalizado abaixo</p>
          </div>

          <div className="bg-gradient-to-r from-secondary/30 to-secondary/10 p-6 rounded-xl mb-6 border border-primary/10 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-10 translate-x-10"></div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              Seu Perfil Personalizado:
            </h3>
            <div 
              className="text-foreground/80 leading-relaxed relative z-10 break-words text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: personalizedMessage }}
              data-testid="text-personalized-message"
            />
          </div>

          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 p-6 rounded-xl mb-6 border border-primary/20 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-success"></div>
            <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Ebook Redação Expert ENEM
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start group transform hover:scale-105 transition-transform duration-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-success to-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2 sm:gap-4">
              <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground line-through opacity-60">R$ 97,00</span>
              <div className="relative">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent" data-testid="text-price">R$ 9,90</span>
                <div className="absolute -top-1 sm:-top-2 -right-2 sm:-right-6 md:-right-8 bg-gradient-to-r from-accent to-primary text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce-gentle">
                  90% OFF
                </div>
              </div>
            </div>
            <div className="inline-flex items-center text-xs sm:text-sm bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-amber-200 dark:border-amber-800 animate-pulse-slow max-w-full">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="break-words">Oferta especial válida por tempo limitado!</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onPurchase}
            disabled={isLoading}
            className="cta-gradient text-white px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg w-full hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
            size="lg"
            data-testid="button-purchase"
          >
            <div className="flex items-center justify-center relative z-10">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce flex-shrink-0" />
                  <span className="break-words">QUERO MEU EBOOK AGORA - R$ 9,90</span>
                </>
              )}
            </div>
          </Button>

          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center justify-center text-sm text-muted-foreground group transform hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-success" />
              </div>
              Pagamento 100% seguro
            </div>
            <div className="flex items-center justify-center text-sm text-muted-foreground group transform hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <RotateCcw className="w-4 h-4 text-primary" />
              </div>
              Garantia de 7 dias ou seu dinheiro de volta
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          O que nossos estudantes dizem:
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="font-semibold text-primary" data-testid={`text-testimonial-${index}`}>
                  - {testimonial.author}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
