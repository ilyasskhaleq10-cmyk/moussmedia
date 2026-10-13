import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import ScrollVideo from "@/components/ScrollVideo";
import Sectors from "@/components/Sectors";
import ReelGallery from "@/components/ReelGallery";
import { Membership, Slots, Process } from "@/components/Offer";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";
import { statement, scrollFilm } from "@/content/site";

// Orden de las secciones de la portada: reordena o quita líneas para cambiar la estructura
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement text={statement} />
        <ScrollVideo id="metodo" {...scrollFilm} />
        <Sectors />
        <ReelGallery />
        <Membership />
        <Slots />
        <Process />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
