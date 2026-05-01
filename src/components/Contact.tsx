import { motion } from "motion/react";
import { Mail, MessageSquare, ExternalLink, AlertTriangle, Download, RotateCcw, Settings } from "lucide-react";
import { VisitorCounter } from "./VisitorCounter";
import { exportQuestionsToCSV, resetVisitorCount } from "../lib/firebase";
import { useState } from "react";

export function Contact() {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset the visitor counter to 0?")) {
      try {
        await resetVisitorCount();
        alert("Counter reset successfully. Refresh the page to see changes.");
      } catch (err) {
        alert("Failed to reset counter.");
      }
    }
  };

  return (
    <footer id="contact" className="px-12 py-12 bg-tarleton-grey-alt border-t border-tarleton-grey-light">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4 text-tarleton-purple-muted text-xs">
          <div className="text-2xl font-serif italic text-tarleton-purple font-bold mb-2">
            Austin&apos;s Study Hub
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2">• austin.riha@tarleton.edu</span>
            <span className="flex items-center gap-2">• SI Sessions: Tues/Thurs 6-7PM</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 text-tarleton-purple-muted">
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="/" className="hover:text-tarleton-purple transition-colors">Home</a>
            <a href="/#schedule" className="hover:text-tarleton-purple transition-colors">Schedule</a>
            <a href="/#resources" className="hover:text-tarleton-purple transition-colors">Resources</a>
            <a href="mailto:austin.riha@tarleton.edu" className="hover:text-tarleton-purple transition-colors">Contact</a>
          </div>
          <div className="text-tarleton-purple-muted opacity-80 text-xs font-serif italic">
            Building a better community of learners
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 pt-8 border-t border-tarleton-purple-light/30 relative">
        <div className="bg-tarleton-purple-light/40 p-6 rounded-2xl border border-tarleton-border italic text-[11px] text-tarleton-purple-muted leading-relaxed max-w-4xl mx-auto text-center">
          <span className="font-bold text-tarleton-purple not-italic uppercase tracking-widest text-[9px] mb-1 block">Title IX Disclosure</span>
          "I am REQUIRED by law under Title IX to report any instances that compromise a student's well-being, so please be aware of what you share with me."
        </div>
        
        <div className="md:absolute bottom-0 right-0 mt-8 md:mt-0 flex flex-col items-end gap-4">
          <div className="flex items-center gap-4">
            {showAdmin && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-white p-2 rounded-xl border border-tarleton-border shadow-sm"
              >
                <button 
                  onClick={exportQuestionsToCSV}
                  className="p-1.5 hover:bg-tarleton-purple-light rounded-lg text-tarleton-purple transition-colors title='Export Questions'"
                  title="Export Questions as CSV"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleReset}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                  title="Reset Visitor Counter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            <button 
              onClick={() => setShowAdmin(!showAdmin)}
              className="p-2 text-tarleton-border hover:text-tarleton-purple transition-colors"
              title="Admin Tools"
            >
              <Settings className="w-4 h-4" />
            </button>
            <VisitorCounter />
          </div>
        </div>

        <p className="text-[10px] text-center text-tarleton-border mt-8 uppercase tracking-widest font-bold">
          &copy; {new Date().getFullYear()} ChemBridge Portal
        </p>
      </div>
    </footer>
  );
}
