import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import KunstrasenVorher from "../assets/KunstrasenVorher.jpeg";
import KunstrasenNachher from "../assets/KunstrasenNachher.jpeg";
import BadezimmerVorher from "../assets/BadezimmerVorher.jpeg";
import BadezimmerNachher from "../assets/BadezimmerNachher.jpeg";
import LaminatVorher from "../assets/LaminatVorher.jpeg";
import LaminatNachher from "../assets/LaminatNachher.jpeg";
import WandVorher from "../assets/WandVorher.jpeg";
import WandNachher from "../assets/WandNachher.png";
import AmaturNachher from "../assets/AmaturNachher.jpeg";
import AmaturVorher from "../assets/AmaturVorher.jpeg";
import KücheNachher from "../assets/KücheNachher.jpeg";
import KücheVorher from "../assets/KücheVorher.jpeg";
import DuscheVorher from "../assets/DuscheVorher.jpeg";
import DuscheNachher from "../assets/DuscheNachher.jpeg";

import Küche from "../assets/Küche.jpeg";
import Wand from "../assets/Wand.jpeg";
import Amatur from "../assets/Amatur.jpeg";
import Dusche from "../assets/Dusche.jpeg";
import Kunstrasen from "../assets/Kunstrasen.jpeg";
import Laminat from "../assets/Laminat.jpeg";
import Repair from "../assets/Repair.jpeg";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Preload images to reduce perceived loading time in dialog
  useEffect(() => {
    const allImages = [
      LaminatVorher, LaminatNachher,
      KunstrasenVorher, KunstrasenNachher,
      BadezimmerVorher, BadezimmerNachher,
      WandVorher, WandNachher,
      AmaturVorher, AmaturNachher,
      KücheVorher, KücheNachher,
      DuscheVorher, DuscheNachher,
      Küche, Wand, Amatur, Dusche, Kunstrasen, Laminat, Repair
    ];

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src as string;
    });
  }, []);

  const projects = [
    {
      icon: "🏡",
      title: "Laminatboden im Wohnzimmer",
      description: "Moderne Laminatverlegung",
      category: "Laminat",
      beforeImage: LaminatVorher,
      afterImage: LaminatNachher,
      background: Laminat,
    },
    {
      icon: "🌿",
      title: "Kunstrasenverlegung im Garten",
      description: "Komplette Gartengestaltung mit Kunstrasen",
      category: "Kunstrasen",
      beforeImage: KunstrasenVorher,
      afterImage: KunstrasenNachher,
      background: Kunstrasen,
    },
    {
      icon: "🔨",
      title: "Badezimmersanierung",
      description: "Komplette Badsanierung mit Fliesenarbeiten",
      category: "Sanierung",
      beforeImage: BadezimmerVorher,
      afterImage: BadezimmerNachher,
      background: Repair,
    },
    {
      icon: "🧰",
      title: "Wandsanierung",
      description: "Tapeten sauber abgezogen und die Wand gestrichen",
      category: "Sanierung",
      beforeImage: WandVorher,
      afterImage: WandNachher,
      background: Wand,
    },
    {
      icon: "🔩",
      title: "Amaturaustausch",
      description: "Alter Wasserhahn wurde durch neuen Wasserhahn ersetzt",
      category: "Sanierung",
      beforeImage: AmaturVorher,
      afterImage: AmaturNachher,
      background: Amatur,
    },
    {
      icon: "🔧",
      title: "Küchenmontage",
      description: "Küchenmontage inkl. Wasser und Abwasseranschluss",
      category: "Sanierung",
      beforeImage: KücheVorher,
      afterImage: KücheNachher,
      background: Küche,
    },
    {
      icon: "🚿",
      title: "Dusche erneuert",
      description: "Moderne Dusche mit neuem Ablauf und Fliesen",
      category: "Sanierung",
      beforeImage: DuscheVorher,
      afterImage: DuscheNachher,
      background: Dusche,
    },
  ];

  /* -----------------------
     Carousel component (swipe / arrows / dots)
     - zeigt immer ein komplettes Bild (object-contain)
     - unterstützt Pointer-Swipe (auch Touch)
  ------------------------*/
  const Carousel = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);
    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
      // reset index when images change
      setIndex(0);
    }, [images]);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const goTo = (i: number) => setIndex(i);

    const onPointerDown = (e: React.PointerEvent) => {
      (e.target as Element).setPointerCapture(e.pointerId);
      setStartX(e.clientX);
      setIsDragging(true);
    };
    const onPointerMove = (e: React.PointerEvent) => {
      if (!isDragging || startX === null) return;
      // you can add subtle drag feedback here if wanted
    };
    const onPointerUp = (e: React.PointerEvent) => {
      if (startX === null) {
        setIsDragging(false);
        return;
      }
      const dx = e.clientX - startX;
      const threshold = 40; // minimal pixels to count as swipe
      if (dx > threshold) {
        prev();
      } else if (dx < -threshold) {
        next();
      }
      setStartX(null);
      setIsDragging(false);
    };

    // keyboard navigation while dialog open
    useEffect(() => {
      const onKey = (ev: KeyboardEvent) => {
        if (ev.key === "ArrowLeft") prev();
        if (ev.key === "ArrowRight") next();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [images]);

    return (
      <div className="w-full">
        <div className="relative w-full max-h-[78vh] flex items-center justify-center bg-black rounded-lg overflow-hidden">
          {/* Prev button */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            type="button"
          >
            ‹
          </button>

          {/* Image container (supports pointer events for swipe) */}
          <div
            className="w-full flex items-center justify-center p-4"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { setStartX(null); setIsDragging(false); }}
          >
            <img
              src={images[index]}
              alt={`Slide ${index + 1}`}
              className="max-h-[74vh] w-auto object-contain transition-opacity duration-300"
              draggable={false}
            />
          </div>

          {/* Next button */}
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            type="button"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-transform ${i === index ? "bg-primary scale-125" : "bg-muted"}`}
              type="button"
            />
          ))}
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

                {/* Overlay (visible on hover) */}
                <div
                  className={`absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center p-4 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <span className="mt-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-glow transition-colors">
                  {project.title}
                </h3>
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

      {/* Dialog für Galerie (Vorher/Nachher) */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="w-full max-w-4xl max-h-[95vh] p-4 sm:p-6 flex flex-col">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
                  {selectedProject.title}
                </DialogTitle>
                <p className="text-sm sm:text-base text-muted-foreground">{selectedProject.description}</p>
              </DialogHeader>

              {/* Carousel mit zwei Bildern (Vorher / Nachher) */}
              <div className="mt-4 flex-1">
                <Carousel images={[selectedProject.beforeImage, selectedProject.afterImage]} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
