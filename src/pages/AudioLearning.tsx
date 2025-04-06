
import SearchInput from "@/components/SearchInput";
import AudioLesson from "@/components/AudioLesson";
import { Play, Volume2, SkipBack, SkipForward, ChevronDown } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { MotionContainer, MotionChild, MotionItem } from "@/components/MotionWrapper";

const AudioLearning = () => {
  // Sample audio lessons
  const audioLessons = [
    {
      title: "Future of AI",
      image: "https://via.placeholder.com/300x200?text=Future+of+AI"
    },
    {
      title: "Scaling a Startup",
      image: "https://via.placeholder.com/300x200?text=Scaling+a+Startup"
    },
    {
      title: "Mindfulness & Focus",
      image: "https://via.placeholder.com/300x200?text=Mindfulness+&+Focus"
    },
    {
      title: "Blockchain Basics",
      image: "https://via.placeholder.com/300x200?text=Blockchain+Basics"
    },
    {
      title: "Marketing Growth",
      image: "https://via.placeholder.com/300x200?text=Marketing+Growth"
    },
    {
      title: "Time Management",
      image: "https://via.placeholder.com/300x200?text=Time+Management"
    },
    {
      title: "Public Speaking Mastery",
      image: "https://via.placeholder.com/300x200?text=Public+Speaking+Mastery"
    },
    {
      title: "Self-Improvement",
      image: "https://via.placeholder.com/300x200?text=Self-Improvement"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto p-6">
          <MotionItem variant="slide" className="mb-6">
            <div className="flex items-center">
              <Volume2 className="h-6 w-6 text-red-500 mr-2" />
              <h1 className="text-3xl font-bold">Audio Learning</h1>
            </div>
          </MotionItem>
          
          <MotionItem variant="fade" delay={0.2} className="mb-8">
            <SearchInput placeholder="Search audio lessons..." />
          </MotionItem>
          
          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {audioLessons.map((lesson, index) => (
              <MotionChild key={index}>
                <AudioLesson
                  title={lesson.title}
                  image={lesson.image}
                />
              </MotionChild>
            ))}
          </MotionContainer>
          
          <MotionItem variant="scale" delay={0.5}>
            <div className="w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-md p-4 text-center mb-8 transform transition-transform hover:scale-[1.02]">
              <button className="w-full flex items-center justify-center gap-2 text-lg font-medium">
                <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                Explore More
              </button>
            </div>
          </MotionItem>
          
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="text-sm">
                Now Playing: None
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-1 hover:text-white/70 transition-all transform hover:scale-110">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white text-black rounded-full hover:bg-white/90 transition-all transform hover:scale-110">
                  <Play className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-white/70 transition-all transform hover:scale-110">
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <select className="bg-orange-500 text-white text-sm p-1 rounded hover:bg-orange-600 transition-colors">
                  <option>1x (Normal)</option>
                  <option>1.5x</option>
                  <option>2x</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AudioLearning;
