import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";
import emailjs from "emailjs-com";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    // ✨ EmailJS senden
    emailjs.send(
      "service_xxx",        // Dein Service ID (aus EmailJS Dashboard)
      "template_xxx",       // Dein Template ID
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        selectedDate: selectedDate || "Kein Termin ausgewählt"
      },
      "publicKey_xxx"       // Dein Public Key
    )
    .then(() => {
      toast({
        title: "Anfrage gesendet!",
        description: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
      setSelectedDate("");
    })
    .catch(() => {
      toast({
        title: "Fehler",
        description: "Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    });
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 1 && 0; // Sonntag deaktivieren
      const isAvailable = !isWeekend;

      days.push({
        date: date.getDate(),
        fullDate: date.toLocaleDateString("de-DE"),
        isAvailable
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Termin vereinbaren
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vereinbaren Sie jetzt Ihren kostenlosen Beratungstermin. Wir kommen zu Ihnen nach Hause und erstellen ein unverbindliches Angebot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Booking Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Kontaktdaten</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary font-medium">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ihr vollständiger Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-border/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary font-medium">
                      E-Mail <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihre.email@beispiel.de"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-border/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary font-medium">
                      Telefon <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0221 123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-border/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-primary font-medium">
                      Gewünschte Leistung <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laminat">Laminat verlegen</SelectItem>
                        <SelectItem value="vinyl">Vinyl verlegen</SelectItem>
                        <SelectItem value="kunstrasen">Kunstrasen installieren</SelectItem>
                        <SelectItem value="handwerk">Allgemeine Handwerksarbeiten</SelectItem>
                        <SelectItem value="beratung">Kostenlose Beratung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-primary font-medium">
                    Nachricht
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie Ihr Projekt..."
                    value={formData.message + (selectedDate ? `\n\nWunschtermin: ${selectedDate}` : "")}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\n\nWunschtermin:.*/, "");
                      setFormData({...formData, message: value});
                    }}
                    rows={4}
                    className="border-border/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  Anfrage senden
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Calendar Widget */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Verfügbare Termine
              </CardTitle>
              <p className="text-muted-foreground">
                Wählen Sie Ihren Wunschtermin:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                  <div key={day} className="text-center font-semibold text-primary p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-6">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day.isAvailable && setSelectedDate(day.fullDate)}
                    disabled={!day.isAvailable}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
                      ${day.isAvailable 
                        ? 'bg-muted hover:bg-accent hover:text-accent-foreground cursor-pointer' 
                        : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                      }
                      ${selectedDate === day.fullDate ? 'bg-primary text-primary-foreground' : ''}
                    `}
                  >
                    {day.date}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium text-primary">Verfügbare Zeiten:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div>24/7 Erreichbar</div>
                </div>
              </div>

              {selectedDate && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium text-accent">
                    Gewählter Termin: {selectedDate}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Booking;
