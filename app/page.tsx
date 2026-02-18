import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Updates from "@/components/Updates";
import About from "@/components/About";
import GettingStarted from "@/components/GettingStarted";
import Buy from "@/components/Buy";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Updates />
        <About />
        <GettingStarted />
        <Buy />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
