import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-foreground/80">
              Christian Marks – Handwerk & Gartenservice
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Ihr zuverlässiger Partner für Bodenverlegung, Kunstrasen und alle Handwerksarbeiten in Köln und Umgebung.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => window.location.href = "https://www.instagram.com/cm.handwerk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}
                variant="outline"
                size="sm"
                className="bg-primary-light/20 border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                📷 Instagram
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-light/20 border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                💬 WhatsApp
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground/80">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Laminat verlegen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Vinyl verlegen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Kunstrasen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Handwerksarbeiten
                </button>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground/80">Service</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("booking")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Termin vereinbaren
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Kostenlose Beratung
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Referenzen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Kundenbewertungen
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground/80">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span className="text-primary-foreground/80">Giesdorfer Allee 3, 50997 Köln </span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <a
                  href="tel:+491733425935"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +49 173 342 5935
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <a
                  className="text-primary-foreground/80 hover:text-accent transition-colors break-all"
                >
                  christian.marks@gmx.de
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span>🕒</span>
                <div className="text-primary-foreground/80 text-sm">
                  <div>24/7 Erreichbar</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-light/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              &copy; {currentYear} Christian Marks – Handwerk & Gartenservice. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-primary-foreground/60 hover:text-accent transition-colors">
                Impressum
              </button>
              <button className="text-primary-foreground/60 hover:text-accent transition-colors">
                Datenschutz
              </button>
              <button className="text-primary-foreground/60 hover:text-accent transition-colors">
                AGB
              </button>
            </div>
          </div>
          <div onClick={() => window.location.href = "https://www.teksign.de"} className="text-primary-foreground/60 flex justify-center mt-10">
            Created by Teksign
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;