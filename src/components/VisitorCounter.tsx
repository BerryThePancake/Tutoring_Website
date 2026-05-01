import { useEffect, useState } from "react";
import { db, incrementVisitorCount } from "@/src/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Users } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment count on mount
    incrementVisitorCount();

    // Listen for real-time updates
    const unsubscribe = onSnapshot(doc(db, "stats", "visitors"), (doc) => {
      if (doc.exists()) {
        setCount(doc.data().visitorCount);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white/50 border border-tarleton-border rounded-full text-tarleton-purple-muted shadow-sm">
      <Users className="w-3.5 h-3.5 text-tarleton-purple-muted" />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {count !== null ? `${count.toLocaleString()} Visitors` : "--- Visitors"}
      </span>
    </div>
  );
}
