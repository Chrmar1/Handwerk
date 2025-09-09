import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Zwei Zimmer in einem Tag, sauber verlegt, top Kanten. Klare Empfehlung",
      author: "Lea K.",
      location: "Laminat - 06/2025",
      rating: 5
    },
    {
      text: "Gute Beratung zur Drainage, sauberer Unterbau. Ergebnis sieht mega aus.",
      author: "Jonas R.",
      location: "Kunstrasen - 07/2025",
      rating: 5
    },
    {
      text: "Kurzfristig Termin bekommen, Siphon getauscht, alles dicht. Freundlich & pünktlich.",
      author: "Sabine M.",
      location: "Reparatur - 07/2025",
      rating: 4
    },
    {
      text: "Vinyl im Flur & Küche – super Übergänge, saubere Sockelleisten. Preis fair.",
      author: "Ali H.",
      location: "Vinyl - 08/2025",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Was unsere Kunden sagen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mehrere Zufriedene Kunden vertrauen auf unsere Expertise. Lesen Sie, was sie über unsere Arbeit sagen.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                  <Star key={index} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="border-t border-border/50 pt-6">
                <cite className="text-lg font-semibold text-primary not-italic">
                  {testimonials[currentTestimonial].author}
                </cite>
                <p className="text-muted-foreground mt-1">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-primary scale-125"
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-muted-foreground">Zufriedene Kunden</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">Durchschnittsbewertung</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Weiterempfehlungsrate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <div className="text-muted-foreground">Antwortzeit</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;