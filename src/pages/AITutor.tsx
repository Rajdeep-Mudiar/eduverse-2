
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Brain, Lightbulb, Clock, Sparkles } from "lucide-react";
import AIChatMessage from "@/components/AIChatMessage";
import { generateAIResponse } from "@/lib/gemini";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! I'm your AI learning assistant powered by Google's Gemini. How can I help you today with your studies?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Get AI response using Gemini API
    try {
      const response = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      toast.success("AI response received", { duration: 2000 });
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    "Can you explain photosynthesis in simple terms?",
    "Help me understand quadratic equations",
    "What are the key events of World War II?",
    "Explain the water cycle and its importance",
    "How do I write a good essay introduction?",
    "What is the difference between DNA and RNA?"
  ];

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col h-[calc(100vh-12rem)]">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 mb-6 p-6 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 rounded-full">
                <Bot className="h-10 w-10 text-eduverse-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              AI Learning Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your personal AI tutor powered by Google Gemini to help with homework, explain concepts, and improve your learning experience.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mb-4 self-center">
              <TabsTrigger value="chat" className="px-8">
                <Bot className="mr-2 h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="topics" className="px-8">
                <Lightbulb className="mr-2 h-4 w-4" />
                Topics
              </TabsTrigger>
              <TabsTrigger value="history" className="px-8">
                <Clock className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <AIChatMessage
                      key={index}
                      content={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex items-center">
                      <div className="bg-gradient-main w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        <Brain className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about your studies..."
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="bg-eduverse-purple hover:bg-purple-700 p-3 rounded-lg text-white disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="topics" className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Mathematics", icon: <div className="bg-blue-100 p-2 rounded-full"><Sparkles className="h-5 w-5 text-blue-600" /></div>, color: "from-blue-50 to-indigo-50" },
                  { title: "Science", icon: <div className="bg-green-100 p-2 rounded-full"><Lightbulb className="h-5 w-5 text-green-600" /></div>, color: "from-green-50 to-emerald-50" },
                  { title: "History", icon: <div className="bg-amber-100 p-2 rounded-full"><Clock className="h-5 w-5 text-amber-600" /></div>, color: "from-amber-50 to-yellow-50" },
                  { title: "Literature", icon: <div className="bg-red-100 p-2 rounded-full"><Bot className="h-5 w-5 text-red-600" /></div>, color: "from-red-50 to-rose-50" },
                  { title: "Languages", icon: <div className="bg-purple-100 p-2 rounded-full"><Sparkles className="h-5 w-5 text-purple-600" /></div>, color: "from-purple-50 to-fuchsia-50" },
                  { title: "Computer Science", icon: <div className="bg-cyan-100 p-2 rounded-full"><Bot className="h-5 w-5 text-cyan-600" /></div>, color: "from-cyan-50 to-blue-50" },
                ].map((topic, index) => (
                  <Card key={index} className={`hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-r ${topic.color} dark:from-gray-800 dark:to-gray-700`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-md font-medium">{topic.title}</CardTitle>
                      {topic.icon}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ask questions about {topic.title.toLowerCase()} concepts, problems, and theories
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="flex-1 overflow-auto">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Suggested Prompts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Click on any prompt to quickly start a conversation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start h-auto py-3 text-left"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      <Lightbulb className="mr-2 h-4 w-4 text-eduverse-purple" />
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default AITutor;
