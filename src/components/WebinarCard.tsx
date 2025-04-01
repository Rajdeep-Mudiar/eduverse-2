
import { Video, Play } from "lucide-react";

interface WebinarCardProps {
  title: string;
  description: string;
  image: string;
  isLive?: boolean;
}

const WebinarCard = ({ title, description, image, isLive = false }: WebinarCardProps) => {
  return (
    <div className="edu-card">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-cover rounded-md mb-3" 
        />
        {isLive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Live Now!
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      
      {isLive ? (
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-orange text-white py-2 rounded-md hover:opacity-90 transition-all">
          <Play className="w-4 h-4" />
          Join Live
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Video className="w-4 h-4 mr-1" />
            <span>Upcoming</span>
          </div>
          <button className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Notify Me
          </button>
        </div>
      )}
    </div>
  );
};

export default WebinarCard;
