import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/home/Contact";
import { Work } from "@/components/home/Work";

export default function HomePage() {

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
    </>
  )
}