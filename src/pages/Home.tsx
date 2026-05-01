import { Hero } from "@/src/components/Hero";
import { Schedule } from "@/src/components/Schedule";
import { Resources } from "@/src/components/Resources";
import { QuestionForm } from "@/src/components/QuestionForm";
import { Contact } from "@/src/components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Schedule />
      <Resources />
      <QuestionForm />
      <Contact />
    </>
  );
}
