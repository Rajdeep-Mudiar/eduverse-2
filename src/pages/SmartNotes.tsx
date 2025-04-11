import { useState, useRef } from 'react';
import { Edit, Save, Mic, MicOff, Bookmark, File, Sparkles, FileText, Clock, Brain, X, Upload, FilePdf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateSummary, generateContent, generateQuizQuestions, GeminiQuizQuestion } from "@/lib/gemini";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const savedNotes = [
  {
    id: 1,
    title: "JavaScript Async Programming",
    content: "Asynchronous programming in JavaScript is handled through callbacks, promises, and async/await syntax. Promises provide a cleaner alternative to callbacks and help avoid callback hell. The async/await syntax builds on promises to make asynchronous code look more like synchronous code.",
    tags: ["JavaScript", "Programming"],
    createdAt: "2 days ago",
    summary: "Overview of async programming patterns in JavaScript: callbacks, promises, and async/await."
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    content: "Machine learning algorithms can be categorized into supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to train models, while unsupervised learning identifies patterns in unlabeled data. Reinforcement learning involves an agent learning to make decisions through reward mechanisms.",
    tags: ["Data Science", "AI"],
    createdAt: "1 week ago",
    summary: "Introduction to the three main categories of machine learning: supervised, unsupervised, and reinforcement learning."
  },
  {
    id: 3,
    title: "React Component Lifecycle",
    content: "React component lifecycle consists of three phases: mounting, updating, and unmounting. In functional components with hooks, useEffect replaces several lifecycle methods. The cleanup function in useEffect is equivalent to componentWillUnmount.",
    tags: ["React", "Web Development"],
    createdAt: "3 weeks ago",
    summary: "Overview of React component lifecycle phases and how hooks handle lifecycle events in functional components."
  }
];

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

interface FlashcardSet {
  id: number;
  title: string;
  cards: Flashcard[];
  color: string;
  textColor: string;
  createdAt: string;
}

const SmartNotes = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState(savedNotes[0]);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [noteSummary, setNoteSummary] = useState("");
  const [currentTags, setCurrentTags] = useState("");
  const [isProcessingAction, setIsProcessingAction] = useState<string | null>(null);
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [createdFlashcards, setCreatedFlashcards] = useState<Flashcard[]>([]);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [createdQuizQuestions, setCreatedQuizQuestions] = useState<GeminiQuizQuestion[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast("Recording started. Speak clearly for better results.", {
        icon: <Mic className="h-4 w-4 text-red-500" />,
      });
    } else {
      toast("Recording stopped.", {
        icon: <MicOff className="h-4 w-4" />,
      });
    }
  };
  
  const handleGenerateSummary = async () => {
    if (currentNote.trim().length === 0) {
      toast.error("Please write some notes first before generating a summary.");
      return;
    }
    
    setIsGeneratingSummary(true);
    setIsProcessingAction("summary");
    
    try {
      const summary = await generateSummary(currentNote);
      setNoteSummary(summary);
      toast.success("Summary generated successfully");
      
      toast(
        <div>
          <p className="font-bold mb-1">AI Summary</p>
          <p className="text-sm">{summary.substring(0, 100)}...</p>
        </div>,
        { duration: 5000 }
      );
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsGeneratingSummary(false);
      setIsProcessingAction(null);
    }
  };
  
  const handleFindRelatedContent = async () => {
    if (currentNote.trim().length === 0) {
      toast.error("Please write some notes first.");
      return;
    }
    
    setIsProcessingAction("related");
    
    try {
      const prompt = `Based on these notes: "${currentNote.substring(0, 500)}...", suggest 3-5 related educational topics or resources that would complement this content. Format as a bulleted list.`;
      
      const response = await generateContent({ prompt });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast(
        <div className="max-w-md">
          <p className="font-bold mb-1">Suggested Related Content</p>
          <div className="text-sm whitespace-pre-line">{response.text}</div>
        </div>,
        { duration: 10000 }
      );
    } catch (error) {
      console.error("Error finding related content:", error);
      toast.error("Failed to find related content. Please try again.");
    } finally {
      setIsProcessingAction(null);
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }
    
    setIsPdfLoading(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        const extractedText = result;
        
        setCurrentNote(extractedText);
        setCurrentTitle(file.name.replace('.pdf', ''));
        setPdfContent(extractedText);
        toast.success("PDF uploaded and text extracted successfully");
        setIsPdfLoading(false);
      };
      
      reader.onerror = () => {
        toast.error("Failed to read the PDF file");
        setIsPdfLoading(false);
      };
      
      reader.readAsText(blob);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error("Failed to process the PDF file");
      setIsPdfLoading(false);
    }
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleCreateFlashcards = async () => {
    if (currentNote.trim().length === 0) {
      toast.error("Please write some notes first.");
      return;
    }
    
    setIsProcessingAction("flashcards");
    
    try {
      const prompt = `Create 5 flashcards from the following notes. For each flashcard, provide a question on the front and the answer on the back. Format as a JSON array:
      [
        {"front": "Question 1", "back": "Answer 1"},
        {"front": "Question 2", "back": "Answer 2"}
      ]
      
      Notes: "${currentNote.substring(0, 1000)}..."`;
      
      const response = await generateContent({ prompt });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const jsonString = response.text.replace(/```json|```/g, '').trim();
      
      try {
        const flashcards = JSON.parse(jsonString);
        
        const flashcardsWithIds = flashcards.map((card: any, index: number) => ({
          ...card,
          id: Date.now() + index
        }));
        
        const newFlashcardSet: FlashcardSet = {
          id: Date.now(),
          title: currentTitle || "Notes Flashcards",
          cards: flashcardsWithIds,
          color: "bg-blue-100 dark:bg-blue-900",
          textColor: "text-blue-800 dark:text-blue-400",
          createdAt: "Just now"
        };
        
        setCreatedFlashcards(flashcardsWithIds);
        setShowFlashcards(true);
        
        const existingFlashcardSets = JSON.parse(localStorage.getItem('flashcardSets') || '[]');
        localStorage.setItem('flashcardSets', JSON.stringify([...existingFlashcardSets, newFlashcardSet]));
        
        toast.success("Flashcards created! View them in Learning Tools > Flashcards");
        
        toast(
          <div className="max-w-md">
            <p className="font-bold mb-1">Flashcard Preview</p>
            <p className="text-sm mb-1"><b>Front:</b> {flashcards[0].front}</p>
            <p className="text-sm"><b>Back:</b> {flashcards[0].back}</p>
            <p className="text-xs mt-2 text-gray-500">+ {flashcards.length - 1} more flashcards</p>
          </div>,
          { duration: 5000 }
        );
      } catch (e) {
        console.error("Error parsing flashcards:", e);
        toast.error("Error creating flashcards. Please try again.");
      }
    } catch (error) {
      console.error("Error creating flashcards:", error);
      toast.error("Failed to create flashcards. Please try again.");
    } finally {
      setIsProcessingAction(null);
    }
  };
  
  const handleGenerateQuiz = async () => {
    if (currentNote.trim().length === 0) {
      toast.error("Please write some notes first.");
      return;
    }
    
    setIsProcessingAction("quiz");
    
    try {
      const topic = currentTitle || "General Knowledge";
      const questions = await generateQuizQuestions(topic, 5);
      
      if (questions.length === 0) {
        throw new Error("Failed to generate quiz questions");
      }
      
      setCreatedQuizQuestions(questions);
      
      localStorage.setItem('quizQuestions', JSON.stringify(questions));
      localStorage.setItem('quizTopic', topic);
      
      toast.success("Quiz generated! Check the Quiz section to take it.");
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Failed to generate quiz. Please try again.");
    } finally {
      setIsProcessingAction(null);
    }
  };
  
  const handleSaveNote = () => {
    if (!currentTitle.trim()) {
      toast.error("Please add a title to your note before saving.");
      return;
    }
    
    if (!currentNote.trim()) {
      toast.error("Cannot save an empty note.");
      return;
    }
    
    const tagsArray = currentTags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    toast.success("Note saved successfully!");
    
    setCurrentNote("");
    setCurrentTitle("");
    setCurrentTags("");
    setNoteSummary("");
  };
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Smart Notes</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="create" className="flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Create Notes
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="edu-card p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1 mr-2">
                    <Input 
                      type="text" 
                      placeholder="Note Title"
                      value={currentTitle}
                      onChange={(e) => setCurrentTitle(e.target.value)} 
                      className="text-lg font-medium"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept=".pdf"
                    />
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={triggerFileUpload}
                      className="flex items-center"
                      disabled={isPdfLoading}
                    >
                      {isPdfLoading ? (
                        <>
                          <span className="animate-spin mr-1">⌛</span> Loading
                        </>
                      ) : (
                        <>
                          <FilePdf className="h-4 w-4 mr-1" />
                          Upload PDF
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant={isRecording ? "destructive" : "outline"} 
                      size="sm"
                      onClick={toggleRecording}
                      className="flex items-center"
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="h-4 w-4 mr-1" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-1" />
                          Record Audio
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      disabled={!currentNote.trim() || !currentTitle.trim()}
                      className="flex items-center"
                      size="sm"
                      onClick={handleSaveNote}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save Note
                    </Button>
                  </div>
                </div>
                
                {isRecording && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-md mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                      <span className="text-sm font-medium text-red-800 dark:text-red-400">Recording audio...</span>
                    </div>
                    <span className="text-sm text-red-700 dark:text-red-300">00:12</span>
                  </div>
                )}
                
                {pdfContent && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-md mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <FilePdf className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-400">PDF content loaded</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setPdfContent(null)}
                      className="text-amber-600 hover:text-amber-800 h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <Textarea 
                  placeholder="Start typing your notes here or use voice-to-text..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                
                {noteSummary && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/50 mt-4">
                    <h4 className="font-medium text-sm flex items-center mb-2">
                      <Sparkles className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                      AI Summary
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-line">
                      {noteSummary}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-500 mr-2">Add Tags:</span>
                  <Input 
                    type="text" 
                    placeholder="e.g., JavaScript, React (comma separated)"
                    className="text-sm"
                    value={currentTags}
                    onChange={(e) => setCurrentTags(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="edu-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                    AI Tools
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    onClick={handleGenerateSummary}
                    disabled={isProcessingAction !== null || !currentNote.trim()}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900 mr-2">
                        {isProcessingAction === "summary" ? (
                          <Brain className="h-4 w-4 text-blue-800 dark:text-blue-400 animate-pulse" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-800 dark:text-blue-400" />
                        )}
                      </div>
                      <span className="font-medium">
                        {isProcessingAction === "summary" ? "Generating..." : "Generate Summary"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Create a concise summary of your notes using Google Gemini AI.
                    </p>
                  </button>
                  
                  <button 
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    onClick={handleFindRelatedContent}
                    disabled={isProcessingAction !== null || !currentNote.trim()}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900 mr-2">
                        {isProcessingAction === "related" ? (
                          <Brain className="h-4 w-4 text-purple-800 dark:text-purple-400 animate-pulse" />
                        ) : (
                          <Brain className="h-4 w-4 text-purple-800 dark:text-purple-400" />
                        )}
                      </div>
                      <span className="font-medium">
                        {isProcessingAction === "related" ? "Finding..." : "Find Related Content"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Discover courses and resources related to your notes.
                    </p>
                  </button>
                  
                  <button 
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    onClick={handleCreateFlashcards}
                    disabled={isProcessingAction !== null || !currentNote.trim()}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900 mr-2">
                        {isProcessingAction === "flashcards" ? (
                          <Brain className="h-4 w-4 text-green-800 dark:text-green-400 animate-pulse" />
                        ) : (
                          <File className="h-4 w-4 text-green-800 dark:text-green-400" />
                        )}
                      </div>
                      <span className="font-medium">
                        {isProcessingAction === "flashcards" ? "Creating..." : "Create Flashcards"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Convert your notes into study flashcards automatically.
                    </p>
                  </button>
                  
                  <button 
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    onClick={handleGenerateQuiz}
                    disabled={isProcessingAction !== null || !currentNote.trim()}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900 mr-2">
                        {isProcessingAction === "quiz" ? (
                          <Brain className="h-4 w-4 text-orange-800 dark:text-orange-400 animate-pulse" />
                        ) : (
                          <Brain className="h-4 w-4 text-orange-800 dark:text-orange-400" />
                        )}
                      </div>
                      <span className="font-medium">
                        {isProcessingAction === "quiz" ? "Generating..." : "Generate Quiz"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Create a quiz based on the content of your notes.
                    </p>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="edu-card p-4">
                <h3 className="font-bold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Notes
                </h3>
                
                <div className="space-y-3">
                  {savedNotes.map((note) => (
                    <div 
                      key={note.id} 
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                    >
                      <h4 className="text-sm font-medium">{note.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{note.createdAt}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="edu-card p-4">
                <h3 className="font-bold mb-4">Voice-to-Text Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400 flex items-center justify-center text-xs mr-2">
                      1
                    </div>
                    <span>Speak clearly and at a moderate pace</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400 flex items-center justify-center text-xs mr-2">
                      2
                    </div>
                    <span>Say punctuation marks like "period" or "comma"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400 flex items-center justify-center text-xs mr-2">
                      3
                    </div>
                    <span>Use "new paragraph" to create line breaks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="edu-card p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">All Notes</h3>
                <Input 
                  type="text" 
                  placeholder="Search notes..."
                  className="max-w-xs text-sm"
                />
              </div>
              
              <div className="space-y-2">
                {savedNotes.map((note) => (
                  <div 
                    key={note.id} 
                    onClick={() => setSelectedNote(note)}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border ${
                      selectedNote.id === note.id 
                        ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-transparent'
                    }`}
                  >
                    <h4 className="font-medium text-sm">{note.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{note.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="edu-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl">{selectedNote.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
                
                {summaryVisible && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/50 mb-4 relative">
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      onClick={() => setSummaryVisible(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <h4 className="font-medium text-sm flex items-center mb-2">
                      <Sparkles className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                      AI Summary
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      {selectedNote.summary}
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[300px]">
                  <p className="whitespace-pre-line">{selectedNote.content}</p>
                </div>
                
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedNote.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showFlashcards} onOpenChange={setShowFlashcards}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generated Flashcards</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {createdFlashcards.map((card) => (
              <div key={card.id} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 font-medium">
                  {card.front}
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  {card.back}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              These flashcards have been saved to Learning Tools
            </span>
            <Button onClick={() => setShowFlashcards(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SmartNotes;
