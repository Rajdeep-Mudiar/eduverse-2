
import HeroSection from "@/components/HeroSection";
import { CardFeature } from "@/components/ui/card-feature";
import { BarChart3, BookOpen, Gamepad2, Video, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { MotionContainer, MotionChild } from "@/components/MotionWrapper";

const Index = () => {
  return (
    <PageTransition className="pt-4">
      <div className="container mx-auto p-6">
        <HeroSection />

        <MotionContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MotionChild>
            <CardFeature
              icon={BarChart3}
              title="Dashboard"
              description="Manage your learning activities efficiently."
              to="/dashboard"
            />
          </MotionChild>
          
          <MotionChild>
            <CardFeature
              icon={Video}
              title="Live Webinar"
              description="Checking for live webinars..."
              to="/webinars"
            />
          </MotionChild>
          
          <MotionChild>
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
          </MotionChild>
        </MotionContainer>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionChild>
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
          </MotionChild>
          
          <MotionChild>
            <CardFeature
              icon={Gamepad2}
              title="Games"
              description="Boost your learning with fun educational games."
              to="/games"
              action={
                <div className="flex flex-wrap gap-2">
                  <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-105">
                    Flappy Bird
                  </button>
                  <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-105">
                    Shuffled Letters
                  </button>
                  <button className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-105">
                    Chess
                  </button>
                </div>
              }
            />
          </MotionChild>
        </MotionContainer>
      </div>
    </PageTransition>
  );
};

export default Index;
