import { motion } from "motion/react";
import { Beaker, BookOpen, Calendar, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/", icon: Beaker },
  { name: "Schedule", href: "/#schedule", icon: Calendar },
  { name: "Resources", href: "/#resources", icon: BookOpen },
  { name: "Submit Question", href: "/#submit", icon: MessageSquare },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tarleton-bg/90 backdrop-blur-md border-b border-tarleton-grey-light">
      <div className="max-w-7xl mx-auto px-12 py-8 flex justify-between items-center h-20">
        <Link to="/" className="text-2xl font-serif italic text-tarleton-purple font-bold">
          Austin&apos;s Study Hub
        </Link>
        
        <div className="flex gap-8 text-xs uppercase tracking-widest font-semibold text-tarleton-purple-muted">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-tarleton-purple transition-colors"
              id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
