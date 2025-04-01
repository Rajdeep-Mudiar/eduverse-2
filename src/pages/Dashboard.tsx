
import { BarChart3, Clock, Award, BookOpen, Trophy, Flame, Brain, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Example learning activity data for the chart
const learningData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 2.8 },
  { day: 'Sun', hours: 2.1 },
];

// Example leaderboard data
const leaderboardData = [
  { id: 1, name: "Alex Johnson", points: 1250, avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Sarah Williams", points: 980, avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Michael Brown", points: 875, avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Emma Davis", points: 760, avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "You", points: 680, avatar: "https://via.placeholder.com/40", isCurrentUser: true },
];

// Example achievement badges
const achievementBadges = [
  { id: 1, title: "Fast Learner", description: "Completed 3 courses in one week", icon: <Clock className="h-6 w-6 text-blue-500" /> },
  { id: 2, title: "Quiz Master", description: "Achieved perfect score in 5 quizzes", icon: <Award className="h-6 w-6 text-purple-500" /> },
  { id: 3, title: "Course Champion", description: "Completed all JavaScript courses", icon: <BookOpen className="h-6 w-6 text-green-500" /> },
];

// Example recommended courses based on user activity
const recommendedCourses = [
  { id: 1, title: "Advanced React Patterns", category: "Programming", icon: <Brain className="h-5 w-5 text-blue-500" /> },
  { id: 2, title: "Data Visualization Mastery", category: "Data Science", icon: <BarChart3 className="h-5 w-5 text-green-500" /> },
  { id: 3, title: "Negotiation Skills", category: "Business", icon: <Video className="h-5 w-5 text-purple-500" /> },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Personalized Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <Clock className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Learning Time</p>
            <h3 className="text-2xl font-bold">12.5 hrs</h3>
          </div>
        </div>

        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <BookOpen className="h-6 w-6 text-green-700 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Courses Enrolled</p>
            <h3 className="text-2xl font-bold">6</h3>
          </div>
        </div>

        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <Award className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Certificates</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Learning Progress Chart */}
        <div className="edu-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Learning Progress</h2>
            <select className="text-sm p-1 border rounded dark:bg-gray-800 dark:border-gray-700">
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-64 w-full">
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                  theme: {
                    light: "#4f46e5",
                    dark: "#818cf8",
                  },
                },
              }}
              className="h-64"
            >
              <BarChart data={learningData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelKey="day"
                  nameKey="hours"
                  formatter={(value) => [`${value} hrs`, "Time Spent"]}
                />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="edu-card">
          <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-gray-700">
              <p className="text-sm font-medium">JavaScript Assignment</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Web Development</span>
                <span>Due Tomorrow</span>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
              <p className="text-sm font-medium">UI/UX Design Project</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Design Principles</span>
                <span>Due in 3 days</span>
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-gray-700">
              <p className="text-sm font-medium">Marketing Quiz</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Digital Marketing</span>
                <span>Due in 5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI Recommendations */}
        <div className="edu-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <Brain className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <div className="p-2 rounded-full bg-white dark:bg-gray-700 mr-3">
                  {course.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{course.title}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                    <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Enroll Now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learning Streak */}
        <div className="edu-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Learning Streak</h2>
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
              <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400 mr-2" />
              <span className="text-4xl font-bold">7</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">days in a row</p>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={index} className="text-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${index < 7 ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                  {index < 7 && <Flame className="h-5 w-5" />}
                </div>
                <span className="text-xs mt-1 block">{day}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-orange-50 dark:bg-gray-800 p-3 rounded-lg border border-orange-100 dark:border-gray-700 text-sm">
            <p className="text-center font-medium">🔥 <span className="text-orange-600 dark:text-orange-400">3 more days</span> to unlock the "10-Day Streak" badge!</p>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="edu-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Leaderboard</h2>
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          
          <div className="space-y-3">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-2 rounded-lg ${user.isCurrentUser ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50" : ""}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold">{user.points}</span>
                  <span className="text-xs text-gray-500 ml-1">pts</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View Full Leaderboard
          </button>
        </div>
      </div>
      
      {/* Badges & Achievements */}
      <div className="edu-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Achievements</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementBadges.map((badge) => (
            <div key={badge.id} className="text-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
                {badge.icon}
              </div>
              <h3 className="font-bold mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-sm mb-2">Progress to Next Badge</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Progress value={68} className="h-2" />
            </div>
            <span className="text-sm">68%</span>
          </div>
        </div>
      </div>
      
      {/* Course Progress Overview */}
      <div className="edu-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Course Progress Overview</h2>
          <select className="text-sm p-1 border rounded dark:bg-gray-800 dark:border-gray-700">
            <option>All Courses</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">JavaScript for Beginners</span>
              <span className="text-sm text-gray-500">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">UI/UX Design Principles</span>
              <span className="text-sm text-gray-500">30%</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Digital Marketing 101</span>
              <span className="text-sm text-gray-500">80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
