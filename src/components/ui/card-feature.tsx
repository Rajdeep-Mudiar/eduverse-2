
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CardFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  className?: string;
  action?: React.ReactNode;
}

export const CardFeature = ({
  icon: Icon,
  title,
  description,
  to,
  className,
  action
}: CardFeatureProps) => {
  return (
    <div className={cn("edu-card", className)}>
      <div className="flex flex-col space-y-3">
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
            <Icon className="h-6 w-6 text-eduverse-purple" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        {action ? (
          <div className="pt-2">
            {action}
          </div>
        ) : (
          <Link 
            to={to} 
            className="inline-flex items-center text-sm font-medium text-eduverse-purple hover:underline"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
