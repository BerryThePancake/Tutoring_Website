import { motion } from "motion/react";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="container mx-auto px-12 pt-32 pb-12">
      <div className="bg-tarleton-purple-light rounded-[40px] p-12 md:p-16 flex flex-col justify-center border border-tarleton-border relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl relative z-10"
        >
          <div className="text-tarleton-purple-muted mb-4 font-bold uppercase text-xs tracking-widest">
            SI Portal • Austin Riha
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-tarleton-purple mb-6">
            Prepare for your next <br />
            <span className="italic font-light">breakthrough in Chem.</span>
          </h1>
          <p className="text-lg text-tarleton-purple-muted mb-10 max-w-lg leading-relaxed">
            Access a curated library of practice exams, session notes, and personalized study guides designed for Chemistry for Engineers 1409.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="#resources"
              className="px-10 py-4 bg-tarleton-purple text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-tarleton-purple-dark transition-all shadow-md flex items-center gap-2"
              id="hero-resources-btn"
            >
              Browse Materials
            </a>
            <a
              href="#schedule"
              className="px-10 py-4 border-2 border-tarleton-purple text-tarleton-purple rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/50 transition-all flex items-center gap-2"
              id="hero-schedule-btn"
            >
              Weekly Schedule
            </a>
          </div>
        </motion.div>

        {/* Decorative background element like in the design */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
