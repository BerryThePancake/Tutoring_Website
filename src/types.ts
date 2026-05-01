export interface Session {
  day: string;
  time: string;
  location: string;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
  category: "Exam" | "General" | "Practice";
}

export interface QuestionSubmission {
  id: string;
  studentName?: string;
  topic: string;
  question: string;
  createdAt: any; // Firestore timestamp
}
