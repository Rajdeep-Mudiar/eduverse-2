
import { toast } from "sonner";

// API key
const ELEVENLABS_API_KEY = "sk_cc169ec1adb5b80184683c8319baabe9ccbbcce1406f3bf7";
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

// Default voice IDs
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

interface TextToSpeechOptions {
  text: string;
  voiceId?: string;
  model?: string;
}

export const textToSpeech = async ({
  text,
  voiceId = DEFAULT_VOICE_ID,
  model = "eleven-multilingual-v2"
}: TextToSpeechOptions): Promise<string> => {
  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ElevenLabs API error:", errorData);
      throw new Error(errorData.detail?.message || "Failed to convert text to speech");
    }

    // Get audio blob from response
    const audioBlob = await response.blob();
    
    // Convert to object URL
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return audioUrl;
  } catch (error) {
    console.error("Error calling ElevenLabs API:", error);
    toast.error("Failed to convert text to speech");
    return "";
  }
};

export const playAudio = (audioUrl: string): HTMLAudioElement => {
  const audio = new Audio(audioUrl);
  audio.play();
  return audio;
};

export const getAvailableVoices = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch voices");
    }

    const data = await response.json();
    return data.voices || [];
  } catch (error) {
    console.error("Error fetching ElevenLabs voices:", error);
    toast.error("Failed to fetch available voices");
    return [];
  }
};
