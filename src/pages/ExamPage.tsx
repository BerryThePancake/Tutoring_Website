import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, FileText, Download, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import { db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface ExamContent {
  title: string;
  description: string;
  topics: string[];
  resources: { name: string; url: string; type: string }[];
}

export function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const [content, setContent] = useState<ExamContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      if (!examId) return;
      setLoading(true);
      try {
        const docRef = doc(db, "exams", examId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data() as ExamContent);
        } else {
          // Fallback static data if not in DB yet
          const examNum = examId.replace("exam-", "");
          setContent({
            title: `Exam ${examNum} Mastery Portal`,
            description: `Comprehensive study materials for the Unit ${examNum} assessment. Including practice problems, key derivations, and session handouts.`,
            topics: ["Key Concepts", "Core Calculations", "Unit Conversions", "Chemical Bonding"],
            resources: []
          });
        }
      } catch (err) {
        console.error("Error fetching exam content:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
    window.scrollTo(0, 0);
  }, [examId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tarleton-bg">
        <Loader2 className="w-8 h-8 text-tarleton-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-tarleton-bg">
      <div className="container mx-auto px-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-tarleton-purple-muted hover:text-tarleton-purple font-bold text-xs uppercase tracking-widest mb-12 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-serif text-tarleton-purple mb-6">
                {content.title}
              </h1>
              <p className="text-xl text-tarleton-purple-muted leading-relaxed">
                {content.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[40px] p-8 md:p-12 border border-tarleton-grey-light shadow-sm">
                  <h2 className="font-serif text-3xl mb-8 font-bold text-tarleton-purple">Specialized Content</h2>
                  
                  {content.resources.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {content.resources.map((res, i) => (
                        <a 
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-6 bg-tarleton-grey-alt rounded-3xl border border-tarleton-grey-light hover:border-tarleton-purple-muted transition-all group flex flex-col justify-between"
                        >
                           <div className="bg-white p-3 rounded-2xl w-fit mb-4 text-tarleton-purple group-hover:bg-tarleton-purple-light transition-colors">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-tarleton-purple mb-1">{res.name}</h4>
                            <p className="text-[10px] text-tarleton-purple-muted uppercase tracking-widest font-bold">{res.type}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-tarleton-purple-light/50 border border-dashed border-tarleton-border p-12 rounded-[2.5rem] text-center">
                      <BookOpen className="w-12 h-12 text-tarleton-purple-muted mx-auto mb-4" />
                      <h3 className="font-serif text-xl text-tarleton-purple mb-2">Content Loading Soon</h3>
                      <p className="text-sm text-tarleton-purple-muted max-w-sm mx-auto">
                        I am currently curating the most relevant problems and notes for this exam. Check back 48 hours before the test date.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-tarleton-purple-light rounded-[40px] p-8 border border-tarleton-border">
                  <h3 className="font-serif text-2xl text-tarleton-purple mb-6">Core Topics</h3>
                  <ul className="space-y-4">
                    {content.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-tarleton-purple-muted font-medium">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-tarleton-purple">
                          {i + 1}
                        </div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-[40px] p-8 border border-tarleton-grey-light shadow-sm">
                  <div className="flex items-center gap-3 text-tarleton-accent mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-bold text-xs uppercase tracking-widest">SI Reminder</h4>
                  </div>
                  <p className="text-xs text-tarleton-purple-muted leading-relaxed italic">
                    Don't forget to attend the group review sessions. Materials on this portal are supplemental to our in-person derivations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
