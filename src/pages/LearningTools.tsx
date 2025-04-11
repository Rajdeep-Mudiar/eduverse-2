
import { useState, useEffect } from 'react';
import { MousePointer, Plus, RotateCcw, Brain, X, Save, Lightbulb, PenTool, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Example flashcards
const defaultFlashcardSets = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    cards: [
      { id: 1, front: "What is a closure?", back: "A closure is a function that has access to its own scope, the scope of the outer function, and the global scope." },
      { id: 2, front: "What is hoisting?", back: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope." },
      { id: 3, front: "What is the difference between let and var?", back: "var is function scoped and can be redeclared. let is block scoped and cannot be redeclared." }
    ],
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-400",
    createdAt: "2 days ago"
  },
  {
    id: 2,
    title: "React Hooks",
    cards: [
      { id: 1, front: "What is useState?", back: "useState is a Hook that lets you add React state to function components." },
      { id: 2, front: "What is useEffect?", back: "useEffect is a Hook that lets you perform side effects in function components." },
      { id: 3, front: "What is useContext?", back: "useContext is a Hook that lets you subscribe to React context without introducing nesting." }
    ],
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-400",
    createdAt: "1 week ago"
  },
  {
    id: 3,
    title: "Data Science Terms",
    cards: [
      { id: 1, front: "What is regression?", back: "Regression is a statistical method used to determine the strength and character of the relationship between a dependent variable and one or more independent variables." },
      { id: 2, front: "What is classification?", back: "Classification is a supervised machine learning technique that assigns categories to a collection of data in order to aid in more accurate predictions and analysis." }
    ],
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-400",
    createdAt: "2 weeks ago"
  }
];

// Example mind maps
const mindMaps = [
  {
    id: 1,
    title: "Web Development Concepts",
    description: "Key concepts and technologies in modern web development",
    image: "https://via.placeholder.com/300x150?text=Web+Dev+Map",
    lastEdited: "Yesterday"
  },
  {
    id: 2,
    title: "Machine Learning Algorithms",
    description: "Overview of different ML algorithms and their applications",
    image: "https://via.placeholder.com/300x150?text=ML+Algorithms",
    lastEdited: "3 days ago"
  },
  {
    id: 3,
    title: "Project Management Framework",
    description: "Steps and methodologies for effective project management",
    image: "https://via.placeholder.com/300x150?text=PM+Framework",
    lastEdited: "1 week ago"
  }
];

const LearningTools = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [flashcardSets, setFlashcardSets] = useState(defaultFlashcardSets);
  const [currentFlashcardSet, setCurrentFlashcardSet] = useState(defaultFlashcardSets[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [newSetTitle, setNewSetTitle] = useState("");
  const [newSetDescription, setNewSetDescription] = useState("");
  
  // Load flashcards from localStorage on component mount
  useEffect(() => {
    const savedFlashcardSets = localStorage.getItem('flashcardSets');
    if (savedFlashcardSets) {
      try {
        const parsedSets = JSON.parse(savedFlashcardSets);
        const allSets = [...defaultFlashcardSets, ...parsedSets];
        
        // Remove duplicates based on id
        const uniqueSets = allSets.filter((set, index, self) => 
          index === self.findIndex((s) => s.id === set.id)
        );
        
        setFlashcardSets(uniqueSets);
        
        // If there are saved sets, set the first one as current
        if (parsedSets.length > 0) {
          setCurrentFlashcardSet(parsedSets[0]);
          setCurrentCardIndex(0);
        }
      } catch (error) {
        console.error("Error loading flashcard sets:", error);
      }
    }
  }, []);
  
  const flipCard = (cardId: number) => {
    if (flippedCard === cardId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(cardId);
    }
  };
  
  const nextCard = () => {
    setFlippedCard(null);
    if (currentCardIndex < currentFlashcardSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };
  
  const prevCard = () => {
    setFlippedCard(null);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(currentFlashcardSet.cards.length - 1);
    }
  };
  
  const handleCreateSet = () => {
    if (!newSetTitle.trim()) return;
    
    const newSet = {
      id: Date.now(),
      title: newSetTitle,
      cards: [],
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-800 dark:text-blue-400",
      createdAt: "Just now"
    };
    
    const updatedSets = [...flashcardSets, newSet];
    setFlashcardSets(updatedSets);
    setNewSetTitle("");
    setNewSetDescription("");
    
    // Also update localStorage
    const existingSets = JSON.parse(localStorage.getItem('flashcardSets') || '[]');
    localStorage.setItem('flashcardSets', JSON.stringify([...existingSets, newSet]));
  };
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Interactive Learning Tools</h1>
      
      <Tabs defaultValue="flashcards" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="flashcards" className="flex items-center">
            <div className="mr-2 h-5 w-5 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="font-bold text-xs text-blue-800 dark:text-blue-400">A</span>
            </div>
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="mindmaps" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Mind Maps
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="flashcards">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Flashcard sets sidebar */}
            <div className="edu-card p-4 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">My Flashcard Sets</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Flashcard Set</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Set Title</label>
                        <Input 
                          placeholder="e.g., Biology Terms" 
                          value={newSetTitle}
                          onChange={(e) => setNewSetTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                        <Textarea 
                          placeholder="Brief description of this flashcard set" 
                          value={newSetDescription}
                          onChange={(e) => setNewSetDescription(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleCreateSet}>Create Set</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-2">
                {flashcardSets.map((set) => (
                  <div 
                    key={set.id}
                    onClick={() => {
                      setCurrentFlashcardSet(set);
                      setCurrentCardIndex(0);
                      setFlippedCard(null);
                    }}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      currentFlashcardSet.id === set.id 
                        ? `${set.color} ${set.textColor}` 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{set.title}</h4>
                        <p className="text-xs mt-1 opacity-80">{set.cards.length} cards • {set.createdAt}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400">AI-Powered Creation</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Let AI generate flashcards from your notes or course materials.
                    </p>
                    <Button size="sm" className="mt-2 text-xs h-7 bg-blue-600 hover:bg-blue-700">
                      Generate Cards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Flashcard study area */}
            <div className="lg:col-span-3">
              <div className="edu-card p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl">{currentFlashcardSet.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {currentCardIndex + 1} / {currentFlashcardSet.cards.length}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentCardIndex(0)}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
                
                {/* Flashcard display */}
                {currentFlashcardSet.cards.length > 0 ? (
                  <div 
                    className="relative h-64 w-full cursor-pointer perspective-1000 mb-4"
                    onClick={() => flipCard(currentFlashcardSet.cards[currentCardIndex].id)}
                  >
                    <div className={`absolute inset-0 transition-all duration-500 transform-style-3d ${
                      flippedCard === currentFlashcardSet.cards[currentCardIndex].id ? 'rotate-y-180' : ''
                    }`}>
                      <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center backface-hidden shadow-md">
                        <h3 className="text-xl font-medium text-center">
                          {currentFlashcardSet.cards[currentCardIndex].front}
                        </h3>
                      </div>
                      <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center backface-hidden rotate-y-180 shadow-md">
                        <p className="text-center">
                          {currentFlashcardSet.cards[currentCardIndex].back}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-gray-500">No cards in this set yet</p>
                      <Button size="sm" className="mt-4">Add Cards</Button>
                    </div>
                  </div>
                )}
                
                {currentFlashcardSet.cards.length > 0 && (
                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={prevCard}>
                      Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                      Click card to flip
                    </span>
                    <Button onClick={nextCard}>
                      Next
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="edu-card p-4">
                  <h4 className="font-medium mb-3">Study Options</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <RotateCcw className="h-4 w-4 text-purple-800 dark:text-purple-400" />
                      </div>
                      <span>Shuffle Cards</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                        <PenTool className="h-4 w-4 text-green-800 dark:text-green-400" />
                      </div>
                      <span>Quiz Mode</span>
                    </button>
                  </div>
                </div>
                
                <div className="edu-card p-4">
                  <h4 className="font-medium mb-3">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cards Mastered</span>
                      <span className="font-bold">2/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Last studied: Yesterday</span>
                      <span>Next review: Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mindmaps">
          <div className="edu-card p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Mind Maps</h3>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Create New Map
              </Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Visualize concepts and their relationships with interactive mind maps. 
              Connect ideas, add notes, and see how different topics relate to each other.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mindMaps.map((map) => (
                <div key={map.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img src={map.image} alt={map.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-medium">{map.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{map.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500">Last edited: {map.lastEdited}</span>
                      <Button size="sm" variant="outline">Open</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="edu-card p-4">
            <div className="flex items-start mb-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-3">
                <Brain className="h-6 w-6 text-blue-800 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold">How to Use Mind Maps</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Mind maps help you organize information visually, making it easier to understand complex subjects.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
                  <span className="font-bold text-green-800 dark:text-green-400">1</span>
                </div>
                <h4 className="font-medium mb-2">Start with a Central Idea</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Place your main concept in the center of the map and work outward.
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
                  <span className="font-bold text-green-800 dark:text-green-400">2</span>
                </div>
                <h4 className="font-medium mb-2">Add Branches</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connect related ideas with branches extending from the center.
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
                  <span className="font-bold text-green-800 dark:text-green-400">3</span>
                </div>
                <h4 className="font-medium mb-2">Use Colors and Images</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visual elements help your brain create stronger associations.
                </p>
              </div>
            </div>
            
            <Button className="mt-6 w-full">Watch Tutorial</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningTools;
