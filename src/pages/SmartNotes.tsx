import React, { useState } from 'react';
import { 
  Edit, 
  Save, 
  Mic, 
  MicOff, 
  Bookmark, 
  File, 
  Sparkles, 
  FileText, 
  Clock, 
  Brain, 
  X, 
  Upload,
  Star
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { generateSummary, generateFlashcards, generateQuizQuestions, GeminiFlashcard } from "@/lib/gemini";
import { generateOpenAIResponse } from "@/lib/openai";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { transcribeAudio } from "@/lib/assemblyai";

const SmartNotes = () => {
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('Untitled Note');
  const [summary, setSummary] = useState('');
  const [generating, setGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [flashcards, setFlashcards] = useState<GeminiFlashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardFront, setFlashcardFront] = useState(true);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [pdfText, setPdfText] = useState('');
  const [quizSettingsOpen, setQuizSettingsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [useOpenAI, setUseOpenAI] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioRecording, setAudioRecording] = useState<MediaRecorder | null>(null);
  const [recordingChunks, setRecordingChunks] = useState<BlobPart[]>([]);
  
  const navigate = useNavigate();

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const pdfTextContent = `Text extracted from ${file.name}. In a real implementation, this would contain actual text extracted from the PDF using a proper PDF parser library.`;
          setPdfText(pdfTextContent);
          setNote(note ? `${note}\n\n${pdfTextContent}` : pdfTextContent);
          toast.success('PDF uploaded successfully');
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error('Failed to upload PDF');
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          setRecordedBlob(audioBlob);
          
          const file = new File([audioBlob], "recording.webm", { type: 'audio/webm' });
          
          toast.loading("Transcribing audio...");
          try {
            const transcription = await transcribeAudio(file);
            setNote(note => note ? `${note}\n\n${transcription}` : transcription);
            toast.success("Audio transcribed and added to notes");
          } catch (error) {
            toast.error("Failed to transcribe audio");
            console.error(error);
          }
        };
        
        mediaRecorder.start();
        setAudioRecording(mediaRecorder);
        setRecordingChunks(chunks);
        setIsRecording(true);
        toast.info("Voice recording started");
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast.error("Could not access microphone");
      }
    } else {
      if (audioRecording) {
        audioRecording.stop();
      }
      setIsRecording(false);
      toast.info("Voice recording stopped");
    }
  };

  const handleGenerateSummary = async () => {
    if (!note.trim()) {
      toast.error("Please add some notes first");
      return;
    }
    
    setGenerating(true);
    try {
      let result;
      if (useOpenAI) {
        const response = await generateOpenAIResponse(`Please summarize the following text concisely and informatively:\n\n${note}`);
        result = response.text;
      } else {
        result = await generateSummary(note);
      }
      setSummary(result);
      toast.success("Summary generated");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateQuiz = () => {
    if (!note.trim()) {
      toast.error("Please add some notes first");
      return;
    }
    
    setQuizSettingsOpen(true);
  };

  const startQuiz = async () => {
    setGenerating(true);
    setQuizSettingsOpen(false);
    
    try {
      sessionStorage.setItem('quizContent', note);
      sessionStorage.setItem('quizTitle', title !== 'Untitled Note' ? title : note.split('\n')[0]);
      sessionStorage.setItem('quizQuestionCount', questionCount.toString());
      sessionStorage.setItem('quizDifficulty', difficulty);
      
      toast.success("Quiz settings saved! Redirecting to quiz...");
      
      setTimeout(() => {
        navigate('/quiz');
      }, 1500);
    } catch (error) {
      console.error("Error preparing quiz:", error);
      toast.error("Failed to prepare quiz");
      setGenerating(false);
    }
  };

  const handleCreateFlashcards = async () => {
    if (!note.trim()) {
      toast.error("Please add some notes first");
      return;
    }
    
    setGenerating(true);
    try {
      const cards = await generateFlashcards(note);
      setFlashcards(cards);
      setShowFlashcards(true);
      toast.success(`${cards.length} flashcards created`);
    } catch (error) {
      console.error("Error creating flashcards:", error);
      toast.error("Failed to create flashcards");
    } finally {
      setGenerating(false);
    }
  };

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setFlashcardFront(true);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setFlashcardFront(true);
    }
  };

  const flipFlashcard = () => {
    setFlashcardFront(!flashcardFront);
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="mr-2 h-6 w-6" />
            <h1 className="text-2xl font-bold">Smart Notes</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {!editMode ? (
              <Button onClick={() => setEditMode(true)} variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
            ) : (
              <Button onClick={() => setEditMode(false)} variant="outline">
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
            )}
            <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "outline"}>
              {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              {isRecording ? "Stop" : "Record"}
            </Button>
            <div>
              <Input 
                type="file" 
                id="pdf-upload" 
                className="hidden" 
                accept=".pdf" 
                onChange={handlePdfUpload}
              />
              <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <Card className="p-4">
              <Input
                placeholder="Note Title"
                className="text-xl font-semibold mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!editMode}
              />
              <Textarea
                placeholder="Start taking your notes here..."
                className="min-h-[400px] resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={!editMode}
              />
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Tools
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Use OpenAI (Better Quality)</span>
                  <input
                    type="checkbox"
                    checked={useOpenAI}
                    onChange={(e) => setUseOpenAI(e.target.checked)}
                    className="ml-2"
                  />
                </div>
                
                <Button onClick={handleGenerateSummary} className="w-full justify-start" disabled={generating}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Summary
                </Button>
                
                <Button onClick={handleGenerateQuiz} className="w-full justify-start" disabled={generating}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Generate Quiz
                </Button>
                
                <Button onClick={handleCreateFlashcards} className="w-full justify-start" disabled={generating}>
                  <Clock className="mr-2 h-4 w-4" />
                  Create Flashcards
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {summary && (
          <Collapsible className="mt-6 border rounded-lg p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                <h2 className="text-xl font-semibold">Summary</h2>
              </div>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="prose dark:prose-invert max-w-none">
                {summary}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {showFlashcards && flashcards.length > 0 && (
          <div className="mt-6 border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Flashcards ({currentFlashcardIndex + 1}/{flashcards.length})
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowFlashcards(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Card className="min-h-[200px] flex items-center justify-center p-6 cursor-pointer" onClick={flipFlashcard}>
              <p className="text-lg text-center">
                {flashcardFront 
                  ? flashcards[currentFlashcardIndex].front 
                  : flashcards[currentFlashcardIndex].back
                }
              </p>
            </Card>
            
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevFlashcard} disabled={currentFlashcardIndex === 0}>Previous</Button>
              <Button onClick={flipFlashcard} variant="outline">Flip</Button>
              <Button onClick={handleNextFlashcard} disabled={currentFlashcardIndex === flashcards.length - 1}>Next</Button>
            </div>
          </div>
        )}

        <Dialog open={quizSettingsOpen} onOpenChange={setQuizSettingsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Bookmark className="mr-2 h-5 w-5" />
                Quiz Settings
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div>
                <Label className="text-sm font-medium mb-2">Number of Questions: {questionCount}</Label>
                <Slider
                  defaultValue={[5]}
                  value={[questionCount]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setQuestionCount(value[0])}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2">Difficulty Level:</Label>
                <RadioGroup 
                  defaultValue="medium" 
                  value={difficulty}
                  onValueChange={(value) => setDifficulty(value as "easy" | "medium" | "hard")}
                  className="flex space-x-4 justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="quiz-easy" />
                    <Label htmlFor="quiz-easy" className="flex items-center">
                      Easy <Star className="h-4 w-4 ml-1 text-green-500 fill-green-500" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="quiz-medium" />
                    <Label htmlFor="quiz-medium" className="flex items-center">
                      Medium <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="quiz-hard" />
                    <Label htmlFor="quiz-hard" className="flex items-center">
                      Hard <Star className="h-4 w-4 ml-1 text-red-500 fill-red-500" />
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setQuizSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={startQuiz} disabled={generating}>
                {generating ? "Preparing Quiz..." : "Start Quiz"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default SmartNotes;
