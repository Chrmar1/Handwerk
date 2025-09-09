import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import PriceCalculator from "@/components/PriceCalculator";
import ProcessSteps from "@/components/ProcessSteps";
import PricingExamples from "@/components/PricingExamples";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <PriceCalculator />
        <ProcessSteps />
        <PricingExamples />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
