
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Gamepad2, 
  Video, 
  Rocket, 
  Bot, 
  Music, 
  SunMoon, 
  Trophy, 
  MessageCircle, 
  Brain, 
  FileText,
  Briefcase,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active 
}: { 
  icon: React.ElementType; 
  label: string; 
  to: string; 
  active: boolean;
}) => {
  return (
    <Link to={to} className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      active ? "bg-eduverse-purple bg-opacity-10 text-eduverse-purple font-medium" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    )}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Gamepad2, label: "Games", path: "/games" },
    { icon: Video, label: "Live Webinars", path: "/webinars" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: MessageCircle, label: "Community", path: "/community" },
    { icon: Brain, label: "Learning Tools", path: "/learning-tools" },
    { icon: FileText, label: "Smart Notes", path: "/smart-notes" },
    { icon: Briefcase, label: "Career Development", path: "/career-development" },
    { icon: Code, label: "Coding Labs", path: "/coding-labs" },
    { icon: Rocket, label: "AI-Powered Quiz", path: "/quiz" },
    { icon: Music, label: "Audio Learning", path: "/audio" },
    { icon: Bot, label: "AI Tutor", path: "/ai-tutor" },
  ];

  return (
    <div className={cn(
      "h-screen border-r bg-white dark:bg-eduverse-black dark:border-gray-800 flex flex-col transition-all overflow-auto",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-main rounded-md flex items-center justify-center">
          <span className="text-white font-bold">E</span>
        </div>
        {!isCollapsed && (
          <h1 className="text-2xl font-bold bg-gradient-main text-transparent bg-clip-text">
            EduVerse
          </h1>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            to={item.path}
            active={location.pathname === item.path}
          />
        ))}
      </nav>

      <div className="p-3 border-t dark:border-gray-800">
        <button 
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          onClick={() => toggleTheme()}
        >
          <SunMoon size={20} />
          {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
