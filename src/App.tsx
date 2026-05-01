import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { ExamPage } from "./pages/ExamPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam/:examId" element={<ExamPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
