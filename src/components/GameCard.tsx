
import { Gamepad2, Play, Star } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const GameCard = ({ title, description, image, difficulty = 'beginner' }: GameCardProps) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  const difficultyStars = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  return (
    <div className="edu-card">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-cover rounded-md mb-3" 
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${difficultyColors[difficulty]}`}>
          <div className="flex items-center">
            {Array.from({ length: difficultyStars[difficulty] }).map((_, i) => (
              <Star key={i} className="w-3 h-3 mr-0.5 fill-current" />
            ))}
            <span className="ml-1">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
          </div>
        </div>
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
