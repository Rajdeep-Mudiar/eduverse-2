
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
  Upload 
} from "lucide-react";  // Using File/FileText instead of FilePdf

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { generateSummary, generateFlashcards, generateQuizQuestions, GeminiFlashcard } from "@/lib/gemini";

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

  // Handle PDF upload
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create a simple text representation for demo
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // For demonstration, we're just showing that we received the file
          const pdfTextContent = `Text extracted from ${file.name}. In a real implementation, this would contain actual text extracted from the PDF using a proper PDF parser library.`;
          setPdfText(pdfTextContent);
          setNote(note ? `${note}\n\n${pdfTextContent}` : pdfTextContent);
          toast.success('PDF uploaded successfully');
        }
      };
      reader.readAsText(file); // In reality, you'd use a PDF extraction library here
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error('Failed to upload PDF');
    }
  };

  // Recording functionality
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording logic
      setIsRecording(true);
      toast.info("Voice recording started");
      // In a real application, implement the WebSpeech API here
    } else {
      // Stop recording logic
      setIsRecording(false);
      toast.info("Voice recording stopped");
      // Process the recording here
    }
  };

  const handleGenerateSummary = async () => {
    if (!note.trim()) {
      toast.error("Please add some notes first");
      return;
    }
    
    setGenerating(true);
    try {
      const result = await generateSummary(note);
      setSummary(result);
      toast.success("Summary generated");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!note.trim()) {
      toast.error("Please add some notes first");
      return;
    }
    
    setGenerating(true);
    try {
      // Use the topic from the title or first line of notes
      const topic = title !== 'Untitled Note' ? title : note.split('\n')[0];
      await generateQuizQuestions(topic);
      toast.success("Quiz questions added to the Quiz section");
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Failed to generate quiz questions");
    } finally {
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
          {/* Left column - Note taking area */}
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

          {/* Right column - AI tools */}
          <div className="col-span-1">
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Tools
              </h2>
              
              <div className="space-y-4">
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

        {/* Summary section */}
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

        {/* Flashcards section */}
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
      </div>
    </PageTransition>
  );
};

export default SmartNotes;
