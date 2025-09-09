import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, FileText, CheckCircle, Award } from "lucide-react";

const ProcessSteps = () => {
  // Scrollfunktion für die E-Mail-Sektion
  const scrollToEmail = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      number: "1",
      title: "Kurze Anfrage",
      description: "Maße/Fotos schicken per WhatsApp, Mail oder Anruf",
      icon: <MessageCircle className="h-8 w-8 text-accent" />,
      actions: [
        { label: "WhatsApp", icon: <MessageCircle className="h-4 w-4" />, link: "https://wa.me/491733425935", type: "external" },
        { label: "Anrufen", icon: <Phone className="h-4 w-4" />, link: "tel:+491733425935", type: "external" },
        { label: "E-Mail", icon: <Mail className="h-4 w-4" />, type: "scroll" } // ← angepasst
      ]
    },
    {
      number: "2",
      title: "Festpreis-Angebot",
      description: "inkl. Anfahrt & Material nach Wunsch",
      icon: <FileText className="h-8 w-8 text-accent" />,
      features: ["Transparente Preise", "Keine versteckten Kosten", "Material auf Wunsch"]
    },
    {
      number: "3",
      title: "Ausführung & Abnahme",
      description: "saubere Arbeit, Rechnung, Gewährleistung nach BGB",
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      features: ["Professionelle Ausführung", "Saubere Baustelle", "Gewährleistung nach BGB"]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Ablauf in 3 Schritten
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Von der ersten Anfrage bis zur fertigen Arbeit – so einfach geht's
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className="relative group hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 bg-gradient-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                <CardContent className="pt-12 pb-8 px-6">
                  <div className="text-center mb-6">
                    <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Action Buttons für Step 1 */}
                  {step.actions && (
                    <div className="flex flex-col gap-2">
                      {step.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            if (action.type === "scroll") {
                              scrollToEmail();
                            } else {
                              window.open(action.link);
                            }
                          }}
                        >
                          {action.icon}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Features für Steps 2 & 3 */}
                  {step.features && (
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                {/* Verbindungslinie (nur Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
                )}
              </Card>
            ))}
          </div>

          {/* Qualitätsgarantie */}
          <Card className="mt-12 bg-gradient-accent text-white border-0">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Unsere Qualitätsgarantie</h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Wir stehen zu unserer Arbeit und bieten Ihnen gesetzliche Gewährleistung nach BGB. 
                Ihre Zufriedenheit ist unser Erfolg.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
