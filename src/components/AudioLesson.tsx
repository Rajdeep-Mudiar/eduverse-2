
import { ThumbsUp, Share2, Download } from "lucide-react";

interface AudioLessonProps {
  title: string;
  image: string;
}

const AudioLesson = ({ title, image }: AudioLessonProps) => {
  return (
    <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-32 object-cover rounded-md mb-3" 
      />
      
      <div className="flex items-center justify-between mt-3">
        <button className="flex items-center text-gray-400 hover:text-white">
          <ThumbsUp className="w-5 h-5 mr-1" />
          <span>0</span>
        </button>
        
        <button className="flex items-center text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
        
        <button className="flex items-center text-gray-400 hover:text-white">
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AudioLesson;
