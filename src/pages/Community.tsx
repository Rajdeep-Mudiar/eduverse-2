
import { useState } from 'react';
import { MessageCircle, Users, Search, ThumbsUp, MessageSquare, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Example forum topics
const forumTopics = [
  {
    id: 1,
    title: "Best resources for learning JavaScript in 2024?",
    author: "Alex Johnson",
    avatar: "https://via.placeholder.com/40",
    category: "Programming",
    replies: 28,
    views: 342,
    likes: 47,
    pinned: true,
    timeAgo: "3 hours ago"
  },
  {
    id: 2,
    title: "Tips for staying motivated during long courses?",
    author: "Emma Davis",
    avatar: "https://via.placeholder.com/40",
    category: "Study Tips",
    replies: 15,
    views: 189,
    likes: 31,
    pinned: false,
    timeAgo: "8 hours ago"
  },
  {
    id: 3,
    title: "Machine Learning vs Deep Learning: What's the difference?",
    author: "Michael Brown",
    avatar: "https://via.placeholder.com/40",
    category: "Data Science",
    replies: 42,
    views: 510,
    likes: 89,
    pinned: false,
    timeAgo: "1 day ago"
  },
  {
    id: 4,
    title: "How to balance full-time work and online learning?",
    author: "Sarah Williams",
    avatar: "https://via.placeholder.com/40",
    category: "Study Tips",
    replies: 36,
    views: 418,
    likes: 72,
    pinned: false,
    timeAgo: "2 days ago"
  },
  {
    id: 5,
    title: "Getting started with React hooks - need help!",
    author: "David Miller",
    avatar: "https://via.placeholder.com/40",
    category: "Programming",
    replies: 23,
    views: 256,
    likes: 41,
    pinned: false,
    timeAgo: "3 days ago"
  }
];

// Study group data
const studyGroups = [
  {
    id: 1,
    name: "JavaScript Masters",
    members: 128,
    description: "A group for JavaScript enthusiasts to practice and learn together",
    category: "Programming",
    image: "https://via.placeholder.com/60?text=JS"
  },
  {
    id: 2,
    name: "Data Science Hub",
    members: 94,
    description: "Discuss data science concepts, share resources and solve problems together",
    category: "Data Science",
    image: "https://via.placeholder.com/60?text=DS"
  },
  {
    id: 3,
    name: "UI/UX Design Club",
    members: 76,
    description: "For design enthusiasts to share work, give feedback and discuss trends",
    category: "Design",
    image: "https://via.placeholder.com/60?text=UX"
  },
  {
    id: 4,
    name: "Python Programmers",
    members: 210,
    description: "Everything Python - from basics to advanced topics",
    category: "Programming",
    image: "https://via.placeholder.com/60?text=PY"
  }
];

// Popular categories
const categories = [
  { name: "Programming", count: 352 },
  { name: "Data Science", count: 218 },
  { name: "Design", count: 185 },
  { name: "Business", count: 143 },
  { name: "Study Tips", count: 137 },
  { name: "Mathematics", count: 98 },
  { name: "Language Learning", count: 86 },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Community & Learning Groups</h1>
      
      <Tabs defaultValue="forums" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="forums" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" /> 
            Discussion Forums
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> 
            Study Groups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="forums">
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="text-sm p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                <option>All Categories</option>
                {categories.map(category => (
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <Button className="shrink-0">New Discussion</Button>
          </div>
          
          {/* Forum topics */}
          <div className="space-y-4 mb-6">
            {forumTopics.map((topic) => (
              <div key={topic.id} className="edu-card p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:flex-1">
                  <div className="flex items-start gap-3">
                    <img src={topic.avatar} alt={topic.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-medium flex items-center">
                        {topic.title}
                        {topic.pinned && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs">
                            Pinned
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>by {topic.author}</span>
                        <span className="mx-2">•</span>
                        <Badge variant="secondary" className="text-xs">{topic.category}</Badge>
                        <span className="mx-2">•</span>
                        <span>{topic.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{topic.replies}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{topic.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Categories sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Button variant="outline" className="w-full">Load More Discussions</Button>
            </div>
            
            <div className="edu-card p-4">
              <h3 className="font-bold mb-3">Popular Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer">
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Study groups list */}
            <div className="md:col-span-2 space-y-4">
              {studyGroups.map((group) => (
                <div key={group.id} className="edu-card p-4 flex gap-4">
                  <img src={group.image} alt={group.name} className="w-16 h-16 rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{group.name}</h3>
                        <Badge variant="secondary" className="mt-1">{group.category}</Badge>
                      </div>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{group.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <Users className="h-3 w-3 inline mr-1" />
                      <span>{group.members} members</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">Show More Groups</Button>
            </div>
            
            {/* Create group card */}
            <div className="edu-card p-4">
              <h3 className="font-bold mb-3">Create Your Own Group</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Start your own study group based on your interests and invite others to join.</p>
              <Button className="w-full">Create Group</Button>
              
              <div className="mt-6">
                <h4 className="font-medium text-sm mb-2">How Study Groups Work</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 flex items-center justify-center text-xs mr-2">1</span>
                    Create a group based on a topic
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 flex items-center justify-center text-xs mr-2">2</span>
                    Invite members or allow people to join
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 flex items-center justify-center text-xs mr-2">3</span>
                    Share resources and discuss topics
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 flex items-center justify-center text-xs mr-2">4</span>
                    Schedule group study sessions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
