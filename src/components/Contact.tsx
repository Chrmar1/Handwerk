import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Adresse",
      content: "50997 Köln\nGiesdorfer Allee 3"
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Telefon",
      content: "+49 173 342 5935",
      link: "tel:+4917334259357"
    },
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "E-Mail",
      content: "Christian.marks@gmx.de",
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Öffnungszeiten",
      content: "24/7 Erreichbar"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Kontakt
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? 
            Kontaktieren Sie uns – wir freuen uns auf Ihr Projekt!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className="group hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Service Area */}
            <Card className="bg-gradient-accent text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Unser Servicegebiet</h3>
                <p className="mb-4">
                  Wir sind in ganz Köln und den umliegenden Gemeinden für Sie da:
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Schnelle Anfrage</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-primary font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    type="text"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-border/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-primary font-medium">
                    E-Mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-border/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMessage" className="text-primary font-medium">
                    Nachricht <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contactMessage"
                    placeholder="Ihre Nachricht..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="border-border/50"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;