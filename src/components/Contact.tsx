import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

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
      content: "christian.marks@gmx.de",
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

          {/* Google Maps statt Kontaktformular */}
              <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-lg border border-border/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.8351886841186!2d6.9500000!3d50.8660000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf3e7c2d2e6c01%3A0x123456789abcdef!2sGiesdorfer%20Allee%203%2C%2050997%20K%C3%B6ln!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
                  className="w-full h-full"
                  style={{ border: "0" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
