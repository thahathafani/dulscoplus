import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Approach from "@/components/Approach";
import Sustainability from "@/components/Sustainability";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Industries />
      <WhyUs />
      <Approach />
      <Sustainability />
      <Contact />
      <Footer />
    </main>
  );
}
