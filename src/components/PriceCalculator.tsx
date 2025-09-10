import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, MessageCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [zone, setZone] = useState("");
  const [effort, setEffort] = useState("");
  const [oldFlooringRemoval, setOldFlooringRemoval] = useState(false);
  const [tileRemoval, setTileRemoval] = useState(false);
  const [leveling, setLeveling] = useState("");
  const { toast } = useToast();

  const baseRates = {
    laminat: 14.5,
    kleinreparatur: 49,
    kunstrasen: 35.5
  };

  const zoneRates = {
    A: 8,
    B: 15,
    C: 0 // nach Vereinbarung
  };

  const additionalRates = {
    oldFlooring: 8,
    tiles: 10,
    leveling5mm: 25,
    leveling10mm: 45
  };

  const calculatePrice = () => {
    if (!service || !zone) return 0; // Fläche NICHT mehr für alle zwingend

    let total = 0;
    const areaNum = parseFloat(area) || 0;

    // Base service cost
    if (service === "kleinreparatur") {
      total += baseRates.kleinreparatur; // immer 49 €, Fläche irrelevant
    } else if (service in baseRates) {
      if (!area) return 0; // Fläche wird nur hier verlangt
      total += baseRates[service as keyof typeof baseRates] * areaNum;
    }

    // Effort multiplier (außer bei Kleinreparatur)
    if (service !== "kleinreparatur" && effort === "hoch") {
      total *= 1.2;
    }

    // Zone cost
    if (zone !== "C") {
      total += zoneRates[zone as keyof typeof zoneRates];
    }

    // Additional services (nur wenn Fläche existiert)
    if (areaNum > 0) {
      if (oldFlooringRemoval) {
        total += additionalRates.oldFlooring * areaNum;
      }
      if (tileRemoval) {
        total += additionalRates.tiles * areaNum;
      }
      if (leveling === "5mm") {
        total += additionalRates.leveling5mm * areaNum;
      }
      if (leveling === "10mm") {
        total += additionalRates.leveling10mm * areaNum;
      }
    }

    // Minimum repair cost
    if (total < 49) {
      total = 49;
    }

    return total;
  };



  const resetCalculator = () => {
    setService("");
    setArea("");
    setZone("");
    setEffort("");
    setOldFlooringRemoval(false);
    setTileRemoval(false);
    setLeveling("");
  };

  const copyToClipboard = () => {
    const price = calculatePrice();
    const text = `Preisschätzung: ~${price.toFixed(0)} € (inkl. Reparatur & Anfahrt)`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopiert!",
      description: "Preisschätzung wurde in die Zwischenablage kopiert.",
    });
  };

  const sendWhatsApp = () => {
    const price = calculatePrice();
    const message = `Hallo! Ich interessiere mich für eine Preisschätzung: ~${price.toFixed(0)} € für ${service} auf ${area}m². Können wir einen Termin vereinbaren?`;
    window.open(`https://wa.me/492211234567?text=${encodeURIComponent(message)}`);
  };

  const calculatedPrice = calculatePrice();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Preisrechner (Richtwert)
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erhalten Sie eine erste Preisschätzung für Ihr Projekt
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Konfiguration</CardTitle>
              <p className="mt-4 text-xs text-red-700">Wir arbeiten mit Pauschalpreisen bei unter 10m²</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Leistung</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laminat">Laminat - Vinyl</SelectItem>
                      <SelectItem value="kleinreparatur">Kleinreperatur</SelectItem>
                      <SelectItem value="kunstrasen">Kunstrasen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Input */}
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Fläche (m²)</Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]*"
                    placeholder="z.B. 25,5"
                    value={area}
                    onChange={(e) => {
                      let val = e.target.value;

                      // Nur Zahlen + Komma/Punkt erlauben
                      val = val.replace(/[^0-9.,]/g, "");

                      // Erstes Komma in Punkt umwandeln (für parseFloat)
                      val = val.replace(",", ".");

                      // Nur positive Zahl zulassen
                      if (val === "" || parseFloat(val) > 0) {
                        setArea(val);
                      }
                    }}
                  />

                </div>

                {/* Zone Selection */}
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Zone</Label>
                  <Select value={zone} onValueChange={setZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Zone A (8 €)</SelectItem>
                      <SelectItem value="B">Zone B (15 €)</SelectItem>
                      <SelectItem value="C">Zone C (n. V.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Effort Selection */}
                <div className="space-y-2">
                  <Label className="text-primary font-medium">Aufwand</Label>
                  <Select
                    value={effort}
                    onValueChange={setEffort}
                    disabled={service === "kleinreparatur"} // Deaktivieren
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="hoch">Hoch (×1,2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Services */}
              <div className="border-t pt-6">
                <Label className="text-lg font-semibold text-primary mb-4 block">
                  Zusatzarbeiten
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="oldFlooring"
                      checked={oldFlooringRemoval}
                      onCheckedChange={(checked) => setOldFlooringRemoval(checked === true)}
                    />
                    <Label htmlFor="oldFlooring" className="cursor-pointer">
                      Altbelag entfernen & entsorgen
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tiles"
                      checked={tileRemoval}
                      onCheckedChange={(checked) => setTileRemoval(checked === true)}
                    />
                    <Label htmlFor="tiles" className="cursor-pointer">
                      Alte Fliesen entfernen
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nivellieren/Spachteln</Label>
                    <Select value={leveling} onValueChange={setLeveling}>
                      <SelectTrigger>
                        <SelectValue placeholder="Auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5mm">bis 5 mm (25 €/m²)</SelectItem>
                        <SelectItem value="10mm">bis 10 mm (45 €/m²)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="border-t pt-6">
                <Card className="bg-gradient-accent text-white border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">
                      ~{calculatedPrice.toFixed(0)} €
                    </div>
                    <p className="text-sm opacity-90">
                      inkl. Reparatur & Anfahrt
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Kopieren
                </Button>
                <Button
                  onClick={sendWhatsApp}
                  className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow"
                >
                  <MessageCircle className="h-4 w-4" />
                  Angebot per WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Zurücksetzen
                </Button>
              </div>

              {/* Price Guidelines */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Richtsätze</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Laminat/Vinyl</div>
                    <div className="text-muted-foreground">ab 14,50 €/m²</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Kunstrasen</div>
                    <div className="text-muted-foreground">ab 35,50 €/m²</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Reparatur</div>
                    <div className="text-muted-foreground">ab 49 €</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Altbelag entfernen</div>
                    <div className="text-muted-foreground">Ø 8 €/m²</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Fliesen entfernen</div>
                    <div className="text-muted-foreground">Ø 10 €/m²</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Nivellieren bis 5/10 mm</div>
                    <div className="text-muted-foreground">Ø 25/45 €/m²</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Zone A</div>
                    <div className="text-muted-foreground">8€</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Zone B</div>
                    <div className="text-muted-foreground">15€</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">Zone C</div>
                    <div className="text-muted-foreground">n. V.</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <strong>Zonenpreise:</strong> Zone A: 8 € • Zone B: 15 € • Zone C: nach Vereinbarung
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;