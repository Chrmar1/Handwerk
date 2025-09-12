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
import DuscheVorher from "../assets/DuscheVorher.jpeg"
import DuscheNachher from "../assets/DuscheNachher.jpeg"

import Küche from "../assets/Küche.jpeg"
import Wand from "../assets/Wand.jpeg"
import Amatur from "../assets/Amatur.jpeg"
import Dusche from "../assets/Dusche.jpeg"
import Kunstrasen from "../assets/Kunstrasen.jpeg"
import Laminat from "../assets/Laminat.jpeg"
import Repair from "../assets/Repair.jpeg"

import { useEffect, useState } from "react";


const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);


  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  const Projects = () => {
    useEffect(() => {
      const imageUrls = [
        // Laminat
        require("../assets/LaminatVorher.jpeg"),
        require("../assets/LaminatNachher.jpeg"),

        // Kunstrasen
        require("../assets/KunstrasenVorher.jpeg"),
        require("../assets/KunstrasenNachher.jpeg"),

        // Badezimmer
        require("../assets/BadezimmerVorher.jpeg"),
        require("../assets/BadezimmerNachher.jpeg"),

        // Wand
        require("../assets/WandVorher.jpeg"),
        require("../assets/WandNachher.png"),

        // Amatur
        require("../assets/AmaturVorher.jpeg"),
        require("../assets/AmaturNachher.jpeg"),

        // Küche
        require("../assets/KücheVorher.jpeg"),
        require("../assets/KücheNachher.jpeg"),
      ];

      imageUrls.forEach((src) => preloadImage(src as string));
    }, []);
  }
  const projects = [
    {
      icon: "🏡",
      title: "Laminatboden im Wohnzimmer",
      description: "Moderne Laminatverlegung",
      category: "Laminat",
      beforeImage:
        LaminatVorher,
      afterImage:
        LaminatNachher,
        background:
        Laminat,
    },
    {
      icon: "🌿",
      title: "Kunstrasenverlegung im Garten",
      description: "Komplette Gartengestaltung mit Kunstrasen",
      category: "Kunstrasen",
      beforeImage:
        KunstrasenVorher,
      afterImage:
        KunstrasenNachher,
        background:
        Kunstrasen,
    },
    {
      icon: "🔨",
      title: "Badezimmersanierung",
      description: "Komplette Badsanierung mit Fliesenarbeiten",
      category: "Sanierung",
      beforeImage:
        BadezimmerVorher,
      afterImage:
        BadezimmerNachher,
        background:
        Repair,
    },
    {
      icon: "🧰",
      title: "Wandsanierung",
      description: "Tapeten sauber abgezogen und die Wand gestrichen",
      category: "Sanierung",
      beforeImage:
        WandVorher,
      afterImage:
        WandNachher,
        background:
        Wand,
    },
    {
      icon: "🔩",
      title: "Amaturaustausch",
      description: "Alter Wasserhahn wurde durch neuen Wasserhahn ersetzt",
      category: "Sanierung",
      beforeImage:
        AmaturVorher,
      afterImage:
        AmaturNachher,
        background:
        Amatur,
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
      background:
        Küche,
    },
    {
      icon: "🔧",
      title: "Badezimmersanierung",
      description: "Individuelle Planung, hochwertige Umsetzung.",
      category: "Sanierung",
      beforeImage:
        DuscheVorher,
      afterImage:
        DuscheNachher,
      background:
        Dusche,
    },
  ];

  const ImageSlideshow = ({ before, after }: { before: string; after: string }) => {
    const [showBefore, setShowBefore] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setShowBefore((prev) => !prev);
      }, 3000); // wechselt alle 3 Sekunden
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="mt-6 flex-1 flex flex-col items-center justify-center">
        {/* Label */}
        <div className="mb-2 text-lg font-semibold text-primary">
          {showBefore ? "Vorher" : "Nachher"}
        </div>

        {/* Bild */}
        <div className="flex-1 flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-border/50 bg-black w-full">
          <img
            src={showBefore ? before : after}
            alt={showBefore ? "Vorher" : "Nachher"}
            className="max-h-[70vh] w-auto object-contain transition-opacity duration-700"
          />
        </div>

        {/* Punkte-Navigation */}
        <div className="mt-4 flex space-x-3">
          <span
            className={`w-3 h-3 rounded-full ${showBefore ? "bg-primary scale-125" : "bg-muted"
              } transition-all duration-300`}
          ></span>
          <span
            className={`w-3 h-3 rounded-full ${!showBefore ? "bg-primary scale-125" : "bg-muted"
              } transition-all duration-300`}
          ></span>
        </div>
      </div>
    );
  };

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
              {/* Nachher-Bild als Hintergrund */}
              <div className="relative h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={project.background}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center p-4 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm mb-2">{project.description}</p>
                  <span className="mt-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
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

              {/* Bild-Slideshow */}
              <ImageSlideshow
                before={selectedProject.beforeImage}
                after={selectedProject.afterImage}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default Projects;
