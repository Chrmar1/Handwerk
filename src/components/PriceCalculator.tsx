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
  const [showPrice, setShowPrice] = useState(false);

  const { toast } = useToast();

  const baseRates = {
    laminat: 14.5,
    Reparatur: 49,
    kunstrasen: 35.5,
  };

  const zoneRates = {
    A: 8,
    B: 15,
    C: 0,
  };

  const additionalRates = {
    oldFlooring: 8,
    tiles: 10,
    leveling5mm: 13,
    leveling10mm: 24,
  };

  const calculatePrice = () => {
    if (!service || !zone) return 0;

    let total = 0;
    const areaNum = parseFloat(area) || 0;

    if (service === "Reparatur") {
      total += baseRates.Reparatur;
    } else if (service.toLowerCase() in baseRates) {
      if (!area) return 0;
      total += baseRates[service.toLowerCase() as keyof typeof baseRates] * areaNum;
    }

    if (service !== "Reparatur" && effort === "hoch") {
      total *= 1.2;
    }

    if (zone !== "C") {
      total += zoneRates[zone as keyof typeof zoneRates];
    }

    if (areaNum > 0) {
      if (oldFlooringRemoval) total += additionalRates.oldFlooring * areaNum;
      if (tileRemoval) total += additionalRates.tiles * areaNum;
      if (leveling === "5mm") total += additionalRates.leveling5mm * areaNum;
      if (leveling === "10mm") total += additionalRates.leveling10mm * areaNum;
    }

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
    setShowPrice(false);
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
    const message = `Hallo! Ich interessiere mich für eine Preisschätzung: ~${price.toFixed(
      0
    )} € für ${service} auf ${area}m². Können wir einen Termin vereinbaren?`;
    window.open(`https://wa.me/491733425935?text=${encodeURIComponent(message)}`);
  };

  const calculatedPrice = calculatePrice();

  const isFormValid =
    service &&
    zone &&
    (service === "Reparatur" || (!!area && parseFloat(area) > 0));

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

        <div className="max-w-4xl mx-auto space-y-10">
          {/* Richtwerte Tabelle 1:1 übernommen */}
          {/* Richtwerte Tabelle optimiert */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Richtwerte</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Laminat/Vinyl</div>
                  <div className="text-muted-foreground">ab 14,50 €/m²</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Kunstrasen</div>
                  <div className="text-muted-foreground">ab 35,50 €/m²</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Reparatur & Renovierung</div>
                  <div className="text-muted-foreground">ab 49 €</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Altbelag entfernen</div>
                  <div className="text-muted-foreground">Ø 8 €/m²</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Fliesen entfernen</div>
                  <div className="text-muted-foreground">Ø 10 €/m²</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Nivellieren bis 5/10 mm</div>
                  <div className="text-muted-foreground">Ø 25/45 €/m²</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Zone A (0-10km)</div>
                  <div className="text-muted-foreground">8€</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Zone B (10-30km)</div>
                  <div className="text-muted-foreground">15€</div>
                </div>
                <div className="bg-muted p-4 rounded-lg shadow-sm">
                  <div className="font-medium">Zone C {"(<30km)"} </div>
                  <div className="text-muted-foreground">n. V.</div>
                </div>
              </div>
              <div className="mt-6 text-xs text-muted-foreground text-center">
                <strong>Zonenpreise:</strong> Zone A: 8 € • Zone B: 15 € • Zone C: nach Vereinbarung
              </div>
            </CardContent>
          </Card>


          {/* Rechner */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Konfiguration</CardTitle>
              <p className="mt-4 text-xs text-red-700">
                Wir arbeiten mit Pauschalpreisen bei unter 10m²
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service */}
              <div className="space-y-2">
                <Label>Leistung</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laminat">Laminat/Vinyl</SelectItem>
                    <SelectItem value="Kunstrasen">Kunstrasen</SelectItem>
                    <SelectItem value="Reparatur">Reparatur & Renovierung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fläche */}
              {service !== "Reparatur" && (
                <div className="space-y-2">
                  <Label>Fläche in m²</Label>
                  <Input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="z. B. 25"
                  />
                </div>
              )}

              {/* Zone */}
              <div className="space-y-2">
                <Label>Zone</Label>
                <Select value={zone} onValueChange={setZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Zone A</SelectItem>
                    <SelectItem value="B">Zone B</SelectItem>
                    <SelectItem value="C">Zone C (nach Vereinbarung)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Aufwand */}
              {service !== "Reparatur" && (
                <div className="space-y-2">
                  <Label>Aufwand</Label>
                  <Select value={effort} onValueChange={setEffort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="hoch">Hoch (x1.2)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-4 text-xs text-red-700">Hoher Aufwand liegt vor bei verklebtem  Boden, fehlendem Zugang oder zusätzlichen Erschwernissen</p>
                </div>
              )}

              {/* Zusatzoptionen */}
              {service !== "Reparatur" && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={oldFlooringRemoval}
                      onCheckedChange={(c) => setOldFlooringRemoval(!!c)}
                    />
                    <Label>Alten Boden entfernen (+8 €/m²)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={tileRemoval}
                      onCheckedChange={(c) => setTileRemoval(!!c)}
                    />
                    <Label>Fliesen entfernen (+10 €/m²)</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Spachteln / Ausgleichsmasse</Label>
                    <Select value={leveling} onValueChange={setLeveling}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bitte wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Keine</SelectItem>
                        <SelectItem value="5mm">bis 5mm (+13 €/m²)</SelectItem>
                        <SelectItem value="10mm">bis 10mm (+24 €/m²)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Berechnen Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowPrice(true)}
                  disabled={!isFormValid}
                  className="bg-gradient-primary text-white"
                >
                  Berechnen
                </Button>
              </div>

              {/* Preis-Ausgabe */}
              {showPrice && (
                <div className="border-t pt-6">
                  <Card className="bg-gradient-accent text-white border-0">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold mb-2">
                        ~{calculatedPrice.toFixed(0)} €
                      </div>
                      <p className="text-sm opacity-90">inkl. Anfahrt</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Aktionen */}
              {showPrice && (
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
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
                  <Button variant="outline" onClick={resetCalculator} className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Zurücksetzen
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;

