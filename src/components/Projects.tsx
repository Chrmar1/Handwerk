import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      icon: "🏡",
      title: "Laminat Wohnzimmer",
      description: "Moderne Laminatverlegung in Köln-Innenstadt",
      category: "Laminat"
    },
    {
      icon: "🌿",
      title: "Kunstrasen Garten",
      description: "Komplette Gartengestaltung mit Kunstrasen",
      category: "Kunstrasen"
    },
    {
      icon: "🏢",
      title: "Vinyl Büro",
      description: "Gewerbliche Vinylverlegung in Köln-Deutz",
      category: "Vinyl"
    },
    {
      icon: "🏠",
      title: "Komplette Renovierung",
      description: "Vollständige Wohnungsrenovierung",
      category: "Renovierung"
    },
    {
      icon: "🌱",
      title: "Terrassen-Kunstrasen",
      description: "Dachterrasse mit hochwertigem Kunstrasen",
      category: "Kunstrasen"
    },
    {
      icon: "🔨",
      title: "Badezimmer-Sanierung",
      description: "Komplette Badsanierung mit Fliesenarbeiten",
      category: "Sanierung"
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-elegant border-border/50 bg-card/50 backdrop-blur-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-48 bg-gradient-accent flex items-center justify-center overflow-hidden">
                <div className="text-8xl opacity-80 transition-transform duration-300 group-hover:scale-110">
                  {project.icon}
                </div>
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-primary/90 flex flex-col justify-center items-center text-white transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
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
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

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
    </section>
  );
};

export default Projects;