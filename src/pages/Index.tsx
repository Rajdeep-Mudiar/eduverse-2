
import HeroSection from "@/components/HeroSection";
import { CardFeature } from "@/components/ui/card-feature";
import { BarChart3, BookOpen, Gamepad2, Video, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <HeroSection />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CardFeature
          icon={BarChart3}
          title="Dashboard"
          description="Manage your learning activities efficiently."
          to="/dashboard"
        />
        
        <CardFeature
          icon={Video}
          title="Live Webinar"
          description="Checking for live webinars..."
          to="/webinars"
        />
        
        <CardFeature
          icon={BookOpen}
          title="Explore Our Courses"
          description="Discover a range of courses designed to help you grow."
          to="/courses"
          action={
            <Link 
              to="/courses" 
              className="text-sm font-medium bg-eduverse-purple text-white py-2 px-4 rounded-md inline-flex items-center hover:bg-eduverse-deep-purple transition-colors"
            >
              Explore Courses
            </Link>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardFeature
          icon={Rocket}
          title="AI-Powered Quiz"
          description="Challenge yourself with AI-generated quizzes."
          to="/quiz"
          action={
            <Link 
              to="/quiz" 
              className="text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md inline-flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Start Quiz
            </Link>
          }
        />
        
        <CardFeature
          icon={Gamepad2}
          title="Games"
          description="Boost your learning with fun educational games."
          to="/games"
          action={
            <div className="flex flex-wrap gap-2">
              <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md">
                Flappy Bird
              </button>
              <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md">
                Shuffled Letters
              </button>
              <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md">
                Chess
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Index;
