import { Button } from "@/components/ui/button";
import Hintergrund from "../assets/Hintergrund1.jpeg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hintergrundbild */}
      <img
        src={Hintergrund}
        alt="Hintergrund"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
      />

      {/* Background Pattern Emojis */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 left-10 text-6xl">🔨</div>
        <div className="absolute top-40 right-20 text-4xl">🏠</div>
        <div className="absolute bottom-40 left-20 text-5xl">🌱</div>
        <div className="absolute bottom-20 right-10 text-3xl">🔧</div>
      </div>

      {/* Inhalt */}
      <div className="container mx-auto px-4 pt-32 pb-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 animate-in slide-in-from-bottom-10 duration-1000 leading-snug break-words px-4">
            Ihr Profi für Bodenverlegung in Köln
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            Laminat, Vinyl, Kunstrasen und alle Handwerksarbeiten – professionell, zuverlässig und zu fairen Preisen.
            Tätig in Köln und Umgebung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-10 duration-1000 delay-600">
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => scrollToSection("booking")}
            >
              Jetzt Termin vereinbaren
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => scrollToSection("contact")}
            >
              Kostenlose Beratung
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-in slide-in-from-bottom-10 duration-1000 delay-900">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Transparente</div>
              <div className="text-gray-200">Preise</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">TOP</div>
              <div className="text-gray-200">Preis-Leistung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-200">Qualitätsgarantie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
