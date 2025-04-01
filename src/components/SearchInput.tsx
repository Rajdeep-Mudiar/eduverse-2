import { useState } from "react";
import { Search, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchInput = ({ placeholder, className, onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support voice search. Try using Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    // Start listening
    if (!isListening) {
      setIsListening(true);
      recognition.start();
      
      toast({
        title: "Listening...",
        description: "Speak now to search. Click the mic again to stop.",
      });
    } else {
      recognition.stop();
      setIsListening(false);
    }
    
    // Handle results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      if (onSearch) {
        onSearch(transcript);
      }
      setIsListening(false);
      
      toast({
        title: "Voice Search Detected",
        description: `Searching for: "${transcript}"`,
      });
    };
    
    // Handle errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      
      toast({
        title: "Voice Search Error",
        description: "There was a problem with voice search. Please try again.",
        variant: "destructive",
      });
    };
    
    // Handle end of speech recognition
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="block w-full p-3 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button 
        onClick={handleVoiceSearch}
        className={cn(
          "absolute inset-y-0 right-0 flex items-center pr-3",
          isListening ? "text-red-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        )}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default SearchInput;
