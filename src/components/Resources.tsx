import { motion } from "motion/react";
import { FileText, Download, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const exams = [
  { id: 1, title: "Exam 1", status: "Available", internalId: "exam-1" },
  { id: 2, title: "Exam 2", status: "Available", internalId: "exam-2" },
  { id: 3, title: "Exam 3", status: "Available", internalId: "exam-3" },
  { id: 4, title: "Exam 4", status: "Available", internalId: "exam-4" },
];

export function Resources() {
  return (
    <section id="resources" className="py-20 container mx-auto px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="text-tarleton-purple-muted mb-2 font-bold uppercase text-[10px] tracking-widest">Digital Archive</div>
          <h2 className="text-4xl md:text-5xl font-serif text-tarleton-purple mb-4">Study Materials</h2>
          <p className="text-tarleton-purple-muted leading-relaxed">
            A curated library of practice exams, lecture summaries, and session notes designed to help you excel in Chem 1409.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {exams.map((exam) => (
            <motion.div
              key={exam.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[32px] border border-tarleton-grey-light hover:border-tarleton-purple-muted transition-all shadow-sm group flex flex-col justify-between h-full relative"
              id={`resource-exam-${exam.id}`}
            >
              <div>
                <div className="text-tarleton-purple-muted mb-2 font-bold uppercase text-[10px] tracking-widest">Unit {exam.id}</div>
                <h3 className="font-serif text-2xl text-tarleton-purple mb-2">{exam.title}</h3>
                <p className="text-xs text-tarleton-purple-muted leading-relaxed">Complete breakdown of key concepts and practice problems.</p>
              </div>
              
              <Link 
                to={`/exam/${exam.internalId}`}
                className="mt-8 flex items-center justify-between group/link"
              >
                <div className="bg-tarleton-grey-alt p-3 rounded-2xl group-hover:bg-tarleton-purple-light transition-colors">
                  <FileText className="w-5 h-5 text-tarleton-purple" />
                </div>
                <div className="flex items-center gap-2 text-tarleton-purple-muted font-bold text-[10px] uppercase tracking-widest">
                  <span>Open Portal</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
        ))}
      </div>
      
      <div className="bg-tarleton-purple-light rounded-[40px] p-10 border border-tarleton-border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 text-center md:text-left">
          <h3 className="font-serif text-3xl text-tarleton-purple mb-2">Stay Connected</h3>
          <p className="text-tarleton-purple-muted text-sm">Join the Remind group for instant notifications and direct message support.</p>
        </div>
        <div className="relative z-10 flex flex-col items-center md:items-end gap-2">
          <div className="text-3xl font-serif italic font-bold tracking-widest bg-white/60 px-8 py-4 rounded-3xl border border-tarleton-border text-tarleton-purple">
            @9dgced
          </div>
          <p className="text-[10px] text-tarleton-purple-muted uppercase tracking-[0.2em] font-bold">Access Code</p>
        </div>
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
