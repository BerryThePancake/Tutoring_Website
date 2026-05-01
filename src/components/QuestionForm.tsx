import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, HelpCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/src/lib/utils";
import { db, auth, handleFirestoreError, OperationType, serverTimestamp } from "@/src/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

const formSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters").optional().or(z.literal("")),
  topic: z.string().min(3, "Please specify the topic (e.g., Stoichiometry)"),
  question: z.string().min(10, "Please describe your question in more detail"),
});

type FormValues = z.infer<typeof formSchema>;

export function QuestionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const questionRef = doc(collection(db, "questions"));
      const submissionData = {
        studentName: data.studentName || "Anonymous",
        topic: data.topic,
        question: data.question,
        createdAt: serverTimestamp(),
      };

      await setDoc(questionRef, submissionData);
      
      setIsSubmitted(true);
      reset();
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError("There was an error submitting your question. Please try again.");
      handleFirestoreError(error, OperationType.CREATE, "questions");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit" className="py-20 container mx-auto px-12">
      <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-sm border border-tarleton-grey-light flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="font-serif text-3xl text-tarleton-purple mb-4">Submit a Question</h2>
          <p className="text-sm text-tarleton-purple-muted leading-relaxed mb-6">
            Have a specific problem or topic you want me to cover in the next supplemental session? Let me know below.
          </p>
          <div className="bg-tarleton-purple-light/20 p-6 rounded-3xl border border-tarleton-purple-light">
            <h4 className="font-bold text-tarleton-purple text-xs uppercase tracking-widest mb-2">Priority Selection</h4>
            <p className="text-xs text-tarleton-purple-muted leading-relaxed italic">
              Questions submitted at least 24 hours before a session are prioritized in the review materials.
            </p>
          </div>
        </div>

        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-tarleton-purple-light text-tarleton-purple rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-tarleton-purple mb-2 font-serif">Topic Received</h3>
                <p className="text-sm text-tarleton-purple-muted mb-6">I'll add this to our next review session roadmap.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-tarleton-purple-muted font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    {...register("studentName")}
                    placeholder="Name (Optional)"
                    className="bg-tarleton-grey-alt border border-tarleton-grey-light rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-tarleton-purple transition-all outline-none"
                  />
                  <input
                    {...register("topic")}
                    placeholder="Topic (e.g. Thermodynamics)"
                    className={cn(
                      "bg-tarleton-grey-alt border border-tarleton-grey-light rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-tarleton-purple transition-all outline-none",
                      errors.topic && "ring-2 ring-red-200"
                    )}
                  />
                </div>
                
                <textarea
                  {...register("question")}
                  rows={4}
                  placeholder="Explain the problem or paste a link to the textbook problem..."
                  className={cn(
                    "bg-tarleton-grey-alt border border-tarleton-grey-light rounded-2xl py-4 px-5 text-sm resize-none focus:ring-2 focus:ring-tarleton-purple transition-all outline-none",
                    errors.question && "ring-2 ring-red-200"
                  )}
                />

                {submitError && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-tarleton-purple text-white font-bold py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-tarleton-purple-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-tarleton-purple/10"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send to SI Leader</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
