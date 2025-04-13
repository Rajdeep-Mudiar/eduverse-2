
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface AIChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatMessage = ({ content, isUser, timestamp }: AIChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-4 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn(
        "w-10 h-10 border",
        isUser ? "bg-green-100 border-green-200" : "bg-purple-100 border-purple-200"
      )}>
        {isUser ? (
          <div className="w-full h-full flex items-center justify-center text-green-600">
            <User className="h-5 w-5" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-purple-600">
            <Bot className="h-5 w-5" />
          </div>
        )}
      </Avatar>
      <div
        className={cn(
          "rounded-xl p-4 max-w-[80%] shadow-sm",
          isUser
            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:bg-green-900 dark:bg-opacity-30 text-gray-800 dark:text-gray-100"
            : "bg-gradient-to-r from-purple-50 to-indigo-50 dark:bg-purple-900 dark:bg-opacity-30 text-gray-800 dark:text-gray-100"
        )}
      >
        <p className="whitespace-pre-wrap mb-1">{content}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default AIChatMessage;
