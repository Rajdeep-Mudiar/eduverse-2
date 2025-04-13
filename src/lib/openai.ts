
import { toast } from "sonner";
import { API_KEYS } from "@/config/api-keys";

export interface OpenAIResponse {
  text: string;
  error?: string;
}

export const generateOpenAIResponse = async (prompt: string): Promise<OpenAIResponse> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEYS.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful, educational AI tutor. Provide clear, concise, and informative responses."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return { 
        text: "", 
        error: data.error?.message || "Failed to generate content" 
      };
    }

    const generatedText = data.choices[0]?.message?.content || "";
    return { text: generatedText };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    toast.error("Failed to connect to OpenAI service");
    return { text: "", error: "Network error" };
  }
};
