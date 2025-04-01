
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
      <Avatar className="w-10 h-10 border">
        {isUser ? (
          <div className="bg-green-500 w-full h-full flex items-center justify-center text-white font-bold">
            U
          </div>
        ) : (
          <div className="bg-gradient-main w-full h-full flex items-center justify-center text-white font-bold">
            AI
          </div>
        )}
      </Avatar>
      <div
        className={cn(
          "rounded-xl p-4 max-w-[80%]",
          isUser
            ? "bg-green-100 dark:bg-green-900 text-gray-800 dark:text-gray-100"
            : "bg-white dark:bg-gray-800 border text-gray-800 dark:text-gray-100"
        )}
      >
        <p className="mb-1">{content}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default AIChatMessage;
