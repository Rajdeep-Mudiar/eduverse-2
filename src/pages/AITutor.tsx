
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Brain } from "lucide-react";
import AIChatMessage from "@/components/AIChatMessage";
import { generateAIResponse } from "@/lib/gemini";

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
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="edu-card mb-6 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Bot className="h-10 w-10 text-eduverse-purple" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">AI Learning Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personal AI tutor powered by Google Gemini to help with homework, explain concepts, and improve your learning experience.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto edu-card p-4 mb-4">
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
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about your studies..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-eduverse-purple p-3 rounded-lg text-white disabled:opacity-50"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutor;
