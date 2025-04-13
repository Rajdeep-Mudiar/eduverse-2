
import { toast } from "sonner";
import { API_KEYS } from "@/config/api-keys";

export const ELEVEN_LABS_VOICES = {
  FEMALE: {
    RACHEL: "21m00Tcm4TlvDq8ikWAM", // Rachel voice
    DOMI: "AZnzlk1XvdvUeBnXmlld", // Domi voice
  },
  MALE: {
    ADAM: "pNInz6obpgDQGcFmaJgB", // Adam voice
    ANTONI: "ErXwobaYiN019PkySvjV", // Antoni voice
  }
};

export const convertTextToSpeech = async (
  text: string, 
  voiceId: string = ELEVEN_LABS_VOICES.FEMALE.RACHEL
): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEYS.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Convert the response to a blob
    const audioBlob = await response.blob();
    // Create a URL for the blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return audioUrl;
  } catch (error) {
    console.error("Error generating speech:", error);
    toast.error("Failed to generate speech");
    throw error;
  }
};
