import { motion } from "motion/react";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";

const sessions = [
  {
    day: "Tuesday",
    time: "6:00 PM - 7:00 PM",
    location: "Math 305",
    type: "Review & Practice",
  },
  {
    day: "Thursday",
    time: "6:00 PM - 7:00 PM",
    location: "Math 305",
    type: "Exam Prep & Questions",
  },
];

export function Schedule() {
  return (
    <section id="schedule" className="py-12 container mx-auto px-12">
      <div className="bg-tarleton-purple-light border border-tarleton-purple-light rounded-[40px] p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
          <div>
            <h2 className="font-serif text-3xl text-tarleton-purple mb-2">Tutoring Sessions</h2>
            <p className="text-tarleton-purple-muted text-sm tracking-tight">Join us for focused Chem 1409 reviews and exam prep.</p>
          </div>
          <div className="bg-white/50 px-4 py-2 rounded-full border border-tarleton-purple-light flex items-center gap-2">
            <Users className="w-4 h-4 text-tarleton-purple-muted" />
            <span className="text-xs font-bold text-tarleton-purple-muted uppercase tracking-widest">SI Program</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {sessions.map((session, index) => (
            <motion.div
              key={session.day}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-[2rem] border border-tarleton-grey-light hover:border-tarleton-purple-muted transition-all group shadow-sm"
              id={`session-${session.day.toLowerCase()}`}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold uppercase transition-colors shrink-0",
                index === 0 ? "bg-tarleton-purple text-white" : "bg-tarleton-purple-muted text-white"
              )}>
                <Calendar className="w-5 h-5 mb-0.5" />
                <span className="leading-none">{session.day.substring(0, 3)}</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-lg font-serif font-bold text-tarleton-purple truncate">{session.type}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs font-medium text-tarleton-purple-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {session.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
