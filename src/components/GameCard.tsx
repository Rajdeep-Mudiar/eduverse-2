
import { Gamepad2, Play } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
}

const GameCard = ({ title, description, image }: GameCardProps) => {
  return (
    <div className="edu-card">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-cover rounded-md mb-3" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      
      <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
        <Play className="w-4 h-4" />
        Play Now
      </button>
    </div>
  );
};

export default GameCard;
