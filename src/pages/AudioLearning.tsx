
import SearchInput from "@/components/SearchInput";
import AudioLesson from "@/components/AudioLesson";
import { Play, Volume2, SkipBack, SkipForward, ChevronDown } from "lucide-react";

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
    <div className="min-h-screen bg-gray-900 text-white animate-fade-in">
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Volume2 className="h-6 w-6 text-red-500 mr-2" />
          <h1 className="text-3xl font-bold">Audio Learning</h1>
        </div>
        
        <SearchInput placeholder="Search audio lessons..." className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {audioLessons.map((lesson, index) => (
            <AudioLesson
              key={index}
              title={lesson.title}
              image={lesson.image}
            />
          ))}
        </div>
        
        <div className="w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-md p-4 text-center mb-8">
          <button className="w-full flex items-center justify-center gap-2 text-lg font-medium">
            <ChevronDown className="h-5 w-5" />
            Explore More
          </button>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-sm">
              Now Playing: None
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-1">
                <SkipBack className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white text-black rounded-full">
                <Play className="h-5 w-5" />
              </button>
              <button className="p-1">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Speed:</span>
              <select className="bg-orange-500 text-white text-sm p-1 rounded">
                <option>1x (Normal)</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLearning;
