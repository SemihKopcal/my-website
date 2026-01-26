import Navbar from "@/layouts/Navbar";
import Main from "@/layouts/Main";
import About from "@/layouts/About";
import Contact from "@/layouts/Contact";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Main />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

