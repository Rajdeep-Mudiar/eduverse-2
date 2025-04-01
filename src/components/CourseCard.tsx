
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  rating: number;
  progress?: number;
  className?: string;
}

const CourseCard = ({
  title,
  description,
  image,
  rating,
  progress = 0,
  className,
}: CourseCardProps) => {
  return (
    <div className={cn("edu-card flex flex-col", className)}>
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-cover rounded-md mb-3" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">{description}</p>
      
      <div className="mt-auto">
        <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full w-full mt-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <button className="ml-auto text-sm px-3 py-1 bg-eduverse-purple text-white rounded-md hover:bg-eduverse-deep-purple transition-colors">
            View Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
