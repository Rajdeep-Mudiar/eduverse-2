
import { useState } from 'react';
import { Trophy, Award, Filter, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Example leaderboard data
const leaderboardData = [
  { id: 1, name: "Alex Johnson", points: 1250, avatar: "https://via.placeholder.com/40", streak: 14, badges: 8 },
  { id: 2, name: "Sarah Williams", points: 980, avatar: "https://via.placeholder.com/40", streak: 21, badges: 12 },
  { id: 3, name: "Michael Brown", points: 875, avatar: "https://via.placeholder.com/40", streak: 7, badges: 5 },
  { id: 4, name: "Emma Davis", points: 760, avatar: "https://via.placeholder.com/40", streak: 10, badges: 6 },
  { id: 5, name: "You", points: 680, avatar: "https://via.placeholder.com/40", isCurrentUser: true, streak: 7, badges: 3 },
  { id: 6, name: "David Wilson", points: 645, avatar: "https://via.placeholder.com/40", streak: 5, badges: 4 },
  { id: 7, name: "Olivia Martinez", points: 590, avatar: "https://via.placeholder.com/40", streak: 3, badges: 2 },
  { id: 8, name: "James Taylor", points: 520, avatar: "https://via.placeholder.com/40", streak: 8, badges: 5 },
  { id: 9, name: "Sophia Anderson", points: 480, avatar: "https://via.placeholder.com/40", streak: 4, badges: 3 },
  { id: 10, name: "Benjamin Thomas", points: 410, avatar: "https://via.placeholder.com/40", streak: 2, badges: 1 },
];

// Top achievers in different categories
const topAchievers = [
  { 
    id: 1,
    name: "Sarah Williams", 
    avatar: "https://via.placeholder.com/60",
    achievement: "Longest Streak", 
    value: "21 days",
    icon: <Award className="h-6 w-6 text-yellow-500" />
  },
  { 
    id: 2,
    name: "Alex Johnson", 
    avatar: "https://via.placeholder.com/60",
    achievement: "Most Points", 
    value: "1250 pts",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />
  },
  { 
    id: 3,
    name: "Emily Parker", 
    avatar: "https://via.placeholder.com/60",
    achievement: "Most Badges", 
    value: "15 badges",
    icon: <Award className="h-6 w-6 text-yellow-500" />
  },
];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      {/* Top Achievers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
          Top Achievers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topAchievers.map((achiever) => (
            <div key={achiever.id} className="edu-card text-center">
              <div className="relative inline-block mb-4">
                <img 
                  src={achiever.avatar} 
                  alt={achiever.name} 
                  className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-200 dark:border-yellow-900"
                />
                <div className="absolute -right-2 -bottom-2 bg-yellow-400 dark:bg-yellow-600 rounded-full p-2">
                  {achiever.icon}
                </div>
              </div>
              <h3 className="font-bold text-lg">{achiever.name}</h3>
              <div className="mt-2">
                <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50">
                  {achiever.achievement}
                </Badge>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{achiever.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Leaderboard */}
      <div className="edu-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-bold flex items-center mb-4 md:mb-0">
            <Users className="mr-2 h-6 w-6" />
            Global Rankings
          </h2>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              className="text-sm p-1 border rounded dark:bg-gray-800 dark:border-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        
        <Tabs defaultValue="points">
          <TabsList className="mb-6">
            <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="streak">Streak</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="points" className="space-y-3">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50" : "border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.isCurrentUser && <span className="text-xs text-blue-600 dark:text-blue-400">That's you!</span>}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold">{user.points}</span>
                  <span className="text-xs text-gray-500 ml-1">pts</span>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="streak" className="space-y-3">
            {[...leaderboardData].sort((a, b) => b.streak - a.streak).map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50" : "border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.isCurrentUser && <span className="text-xs text-blue-600 dark:text-blue-400">That's you!</span>}
                </div>
                <div className="flex items-center text-orange-500">
                  <Flame className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">{user.streak}</span>
                  <span className="text-xs text-gray-500 ml-1">days</span>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="badges" className="space-y-3">
            {[...leaderboardData].sort((a, b) => b.badges - a.badges).map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50" : "border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.isCurrentUser && <span className="text-xs text-blue-600 dark:text-blue-400">That's you!</span>}
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-purple-500" />
                  <span className="text-sm font-bold">{user.badges}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
