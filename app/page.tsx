import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Operator } from "@/components/sections/Operator";
import { Contact } from "@/components/sections/Contact";
import { Scanline } from "@/components/Scanline";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Services />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Process />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Operator />
        <div className="px-5 sm:px-8">
          <Scanline />
        </div>
        <Contact />
      </main>
    </>
  );
}
