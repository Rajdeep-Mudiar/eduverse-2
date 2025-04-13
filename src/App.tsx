
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Games from "./pages/Games";
import Webinars from "./pages/Webinars";
import Quiz from "./pages/Quiz";
import AudioLearning from "./pages/AudioLearning";
import AITutor from "./pages/AITutor";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import LearningTools from "./pages/LearningTools";
import SmartNotes from "./pages/SmartNotes";
import CareerDevelopment from "./pages/CareerDevelopment";
import CodingLabs from "./pages/CodingLabs";
import YouTubeLearning from "./pages/YouTubeLearning";

const queryClient = new QueryClient();

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/games" element={<Games />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/audio" element={<AudioLearning />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/learning-tools" element={<LearningTools />} />
        <Route path="/smart-notes" element={<SmartNotes />} />
        <Route path="/career-development" element={<CareerDevelopment />} />
        <Route path="/coding-labs" element={<CodingLabs />} />
        <Route path="/youtube-learning" element={<YouTubeLearning />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
              <AnimatedRoutes />
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
