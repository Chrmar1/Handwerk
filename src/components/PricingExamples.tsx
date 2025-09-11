import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";

const PricingExamples = () => {
  const pricingExamples = [
    {
      title: "Laminat/Vinyl",
      basePrice: "ab 14,50 €/m²",
      description: "inkl. Verlegung & Zuschnitt, exkl. Material",
      features: [
        "Professionelle Verlegung",
        "Präziser Zuschnitt",
        "Fachgerechte Montage",
        "Fugenabdichtung"
      ],
      popular: false,
      gradient: "from-blue-500 to-blue-600",
      emoji: "🏡" // neues Feld
    },
    {
      title: "Kunstrasen",
      basePrice: "ab 35,50 €/m²",
      description: "Unterbau, Vlies & Verkleben – nach Fläche",
      features: [
        "Unterbau vorbereiten",
        "Vlies verlegen",
        "Professionelles Verkleben",
        "Randabschluss",
        "Bürstenbehandlung"
      ],
      popular: true,
      gradient: "from-green-500 to-green-600",
      emoji: "🌿"
    },
    {
      title: "Reparatur & Renovierung",
      basePrice: "ab 49 €",
      description: "zzgl. Anfahrt & Material",
      features: [
        "Schnelle Terminvergabe",
        "Fachgerechte Reparatur",
        "Materialberatung",
        "Gewährleistung"
      ],
      popular: false,
      gradient: "from-orange-500 to-orange-600",
      emoji: "🔨"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Leistungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparente Preise für alle unsere Hauptleistungen
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingExamples.map((example, index) => (
              <Card 
                key={index}
                className={`relative group hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 ${
                  example.popular ? 'ring-2 ring-accent' : ''
                }`}
              >
                {example.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1">
                    Beliebt
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${example.gradient} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {example.emoji}
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {example.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {example.basePrice}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {example.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    onClick={() => window.open('https://wa.me/491733425935?text=Hallo! Ich interessiere mich für ein Angebot für ' + example.title + '.')}
                  >
                    Angebot anfragen
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <Card className="mt-12 bg-muted/50 border-border/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Wichtige Hinweise zu unseren Preisen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                    <div>
                      <h4 className="font-medium text-primary mb-2">Preisgestaltung</h4>
                      <ul className="space-y-1">
                        <li>• Material wird nach Aufwand berechnet</li>
                        <li>• Anfahrtskosten je nach Zone</li>
                        <li>• Festpreise nach Besichtigung</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-2">Leistungen</h4>
                      <ul className="space-y-1">
                        <li>• Kostenlose Erstberatung</li>
                        <li>• Professionelle Ausführung</li>
                        <li>• Saubere Baustelle</li>
                        <li>• Gewährleistung nach BGB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingExamples;
