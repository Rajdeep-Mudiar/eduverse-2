import { toast } from "sonner";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBQw_aZH8STLIWryaFgWJoBycfRTGwATiM";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

export interface GeminiResponse {
  text: string;
  error?: string;
}

export interface GeminiQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface GeminiParams {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  topK?: number;
  topP?: number;
}

export interface GeminiFlashcard {
  front: string;
  back: string;
}

export const generateContent = async (params: GeminiParams): Promise<GeminiResponse> => {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: params.prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: params.temperature || 0.7,
          topK: params.topK || 40,
          topP: params.topP || 0.95,
          maxOutputTokens: params.maxOutputTokens || 1024,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return { 
        text: "", 
        error: data.error?.message || "Failed to generate content" 
      };
    }

    // Extract the generated text from the response
    const generatedText = data.candidates[0]?.content?.parts?.[0]?.text || "";
    return { text: generatedText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    toast.error("Failed to connect to AI service");
    return { text: "", error: "Network error" };
  }
};

export const generateQuizQuestions = async (
  topic: string, 
  count: number = 5, 
  difficulty: "easy" | "medium" | "hard" = "medium"
): Promise<GeminiQuizQuestion[]> => {
  const difficultyDescription = {
    easy: "simple questions with straightforward answers, suitable for beginners",
    medium: "moderately challenging questions that require some knowledge of the subject",
    hard: "difficult questions that require deep understanding and critical thinking"
  };
  
  const prompt = `Generate ${count} ${difficulty} multiple-choice quiz questions about ${topic}. 
  The difficulty should be ${difficultyDescription[difficulty]}.
  
  Format the response as a valid JSON array with the following structure:
  [
    {
      "question": "Question text here?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 2 // Zero-based index of the correct option
    }
  ]
  Make sure the JSON is valid and correctly formatted. Do not include any additional text outside the JSON array.`;

  try {
    const response = await generateContent({
      prompt,
      temperature: 0.5, // Lower temperature for more factual responses
      maxOutputTokens: 2048
    });

    if (response.error) {
      throw new Error(response.error);
    }

    // Extract the JSON portion from the text
    const jsonString = response.text.trim().replace(/```json|```/g, '');
    const questions = JSON.parse(jsonString) as GeminiQuizQuestion[];
    
    return questions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    toast.error("Failed to generate quiz questions");
    return [];
  }
};

export const generateFlashcards = async (content: string, count: number = 5): Promise<GeminiFlashcard[]> => {
  const prompt = `Create ${count} flashcards from the following content. For each flashcard, provide a question on the front and the answer on the back. Format as a JSON array:
  [
    {"front": "Question 1", "back": "Answer 1"},
    {"front": "Question 2", "back": "Answer 2"}
  ]
  
  Content: "${content.substring(0, 2000)}..."
  
  Make sure the JSON is valid and correctly formatted. Do not include any additional text outside the JSON array.`;

  try {
    const response = await generateContent({
      prompt,
      temperature: 0.4, // Lower temperature for more factual flashcards
      maxOutputTokens: 2048
    });

    if (response.error) {
      throw new Error(response.error);
    }

    // Extract the JSON portion from the text
    const jsonString = response.text.trim().replace(/```json|```/g, '');
    const flashcards = JSON.parse(jsonString) as GeminiFlashcard[];
    
    return flashcards;
  } catch (error) {
    console.error("Error generating flashcards:", error);
    toast.error("Failed to generate flashcards");
    return [];
  }
};

export const generateSummary = async (text: string): Promise<string> => {
  const prompt = `Summarize the following text in a concise and informative manner:
  "${text.substring(0, 3000)}..."
  
  Provide a clear and structured summary that captures the key points.`;

  try {
    const response = await generateContent({
      prompt,
      temperature: 0.3, // Lower temperature for more focused summary
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    toast.error("Failed to generate summary");
    return "";
  }
};

export const extractTextFromPDF = async (pdfArrayBuffer: ArrayBuffer): Promise<string> => {
  // In a real implementation, you'd use a PDF parsing library
  // This is a placeholder for the PDF extraction logic
  
  // For demonstration purposes, we'll use a mock implementation
  // In production, consider using libraries like pdf.js or pdfjs-dist
  
  try {
    // This would be where the actual PDF parsing would happen
    // For now, we'll return a placeholder message
    return "This is extracted text from the PDF file. In a real implementation, this would contain the actual text content from the PDF document.";
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const prompt = `You are a helpful AI tutor assistant. The user says: "${userMessage}"
  
  Provide a helpful, informative and educational response. Be concise but thorough.`;

  try {
    const response = await generateContent({
      prompt,
      temperature: 0.7,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    toast.error("Failed to generate AI response");
    return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
  }
};
