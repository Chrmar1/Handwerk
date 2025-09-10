import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import KunstrasenVorher from "../assets/KunstrasenVorher.jpeg"
import KunstrasenNachher from "../assets/KunstrasenNachher.jpeg"
import BadezimmerVorher from "../assets/BadezimmerVorher.jpeg"
import BadezimmerNachher from "../assets/BadezimmerNachher.jpeg"
import LaminatVorher from "../assets/LaminatVorher.jpeg"
import LaminatNachher from "../assets/LaminatNachher.jpeg"
import WandVorher from "../assets/WandVorher.jpeg"
import WandNachher from "../assets/WandNachher.png"
import AmaturNachher from "../assets/AmaturNachher.jpeg"
import AmaturVorher from "../assets/AmaturVorher.jpeg"
import KücheNachher from "../assets/KücheNachher.jpeg"
import KücheVorher from "../assets/KücheVorher.jpeg"

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      icon: "🏡",
      title: "Laminat Wohnzimmer",
      description: "Moderne Laminatverlegung in Köln-Innenstadt",
      category: "Laminat",
      beforeImage:
        LaminatVorher,
      afterImage:
        LaminatNachher,
    },
    {
      icon: "🌿",
      title: "Kunstrasen Garten",
      description: "Komplette Gartengestaltung mit Kunstrasen",
      category: "Kunstrasen",
      beforeImage:
        KunstrasenVorher,
      afterImage:
        KunstrasenNachher,
    },
    {
      icon: "🔨",
      title: "Badezimmer-Sanierung",
      description: "Komplette Badsanierung mit Fliesenarbeiten",
      category: "Sanierung",
      beforeImage:
        BadezimmerVorher,
      afterImage:
        BadezimmerNachher,
    },
    {
      icon: "🧰",
      title: "Wand-Sanierung",
      description: "Tapeten sauber abgezogen und die Wand gestrichen",
      category: "Sanierung",
      beforeImage:
        WandVorher,
      afterImage:
        WandNachher,
    },
    {
      icon: "🔩",
      title: "Amatur-Austausch",
      description: "Altes Wasserhahn wurde durch neues ersetzt",
      category: "Sanierung",
      beforeImage:
        AmaturVorher,
      afterImage:
        AmaturNachher,
    },
    {
      icon: "🔧",
      title: "Küchenmontage",
      description: "Küchenmontage inkl. Wasser und Abwasseranschluss",
      category: "Sanierung",
      beforeImage:
        KücheVorher,
      afterImage:
        KücheNachher,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Abgeschlossene Projekte
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie eine Auswahl unserer erfolgreich abgeschlossenen Projekte in Köln und Umgebung.
          </p>
        </div>

        {/* Projektkarten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-elegant border-border/50 bg-card/50 backdrop-blur-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 bg-gradient-accent flex items-center justify-center overflow-hidden">
                <div className="text-8xl opacity-80 transition-transform duration-300 group-hover:scale-110">
                  {project.icon}
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-primary/90 flex flex-col justify-center items-center text-white transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <h3 className="text-xl font-bold mb-2 text-center px-4">
                    {project.title}
                  </h3>
                  <p className="text-center px-4 text-primary-foreground/90">
                    {project.description}
                  </p>
                  <span className="mt-3 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-glow transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Beratung CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Möchten Sie Ihr Projekt mit uns verwirklichen?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
          >
            Jetzt Beratungstermin vereinbaren
          </button>
        </div>
      </div>

      {/* Dialog für Vorher/Nachher */}
      {/* Dialog für Vorher/Nachher */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-6 flex flex-col">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {selectedProject.title}
                </DialogTitle>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </DialogHeader>

              {/* Bildbereich */}
              <div className="mt-6 flex-1 flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-border/50">
                <ReactCompareSlider
                  className="w-full max-h-[70vh]"
                  itemOne={
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <img
                        src={selectedProject.beforeImage}
                        alt="Vorher"
                        className="max-h-[70vh] w-auto object-contain"
                      />
                    </div>
                  }
                  itemTwo={
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <img
                        src={selectedProject.afterImage}
                        alt="Nachher"
                        className="max-h-[70vh] w-auto object-contain"
                      />
                    </div>
                  }
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
