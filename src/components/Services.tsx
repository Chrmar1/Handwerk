import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: "🏠",
      title: "Laminat & Vinyl",
      description: "Professionelle Verlegung von Laminat- und Vinylböden. Hochwertige Materialien, präzise Arbeit und langanhaltende Qualität für Ihr Zuhause."
    },
    {
      icon: "🌱",
      title: "Kunstrasen",
      description: "Installation von hochwertigem Kunstrasen für Garten, Terrasse und Balkon. Pflegeleicht, langlebig und das ganze Jahr über grün."
    },
    {
      icon: "🔧",
      title: "Kleinreparatur",
      description: "Montage und austausch (z.B. Amaturen). Kleinere Holz- & Möbelarbeiten. "
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Von der Beratung bis zur Fertigstellung – wir bieten Ihnen professionelle Handwerksleistungen aus einer Hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl text-primary group-hover:text-primary-glow transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;