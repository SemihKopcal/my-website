import Navbar from "@/layouts/Navbar";
import Main from "@/layouts/Main";
import Tech from "@/layouts/Tech";
import Projects from "@/layouts/Projects";
import About from "@/layouts/About";
import Contact from "@/layouts/Contact";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <Main/>
      <Tech />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
