import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisProvider } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  useEffect(() => {
    // Enables the pre-hidden animation states only once JS is running, so the
    // page is never blank without JS.
    const html = document.documentElement;
    html.classList.add("js-ready");

    // Layout settles a frame after mount (fonts, SVG, images) — recompute pins.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(id);
      html.classList.remove("js-ready");
    };
  }, []);

  return (
    <LenisProvider>
      <Loader />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.24em] focus:text-ink"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </LenisProvider>
  );
}
