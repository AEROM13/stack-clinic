import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { Proof } from "@/components/sections/Proof";
import { Process } from "@/components/sections/Process";
import { Booking } from "@/components/sections/Booking";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Scanline } from "@/components/Scanline";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Offers />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Proof />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Process />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Booking />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Faq />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Footer />
      </main>
    </>
  );
}
