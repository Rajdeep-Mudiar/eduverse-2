
import { toast } from "sonner";
import { API_KEYS } from "@/config/api-keys";

export const transcribeAudio = async (audioFile: File): Promise<string> => {
  try {
    // First, upload the audio file to AssemblyAI
    const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
      method: "POST",
      headers: {
        "Authorization": API_KEYS.ASSEMBLYAI_API_KEY,
        "Content-Type": "application/octet-stream",
      },
      body: audioFile,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload audio file");
    }

    const uploadData = await uploadResponse.json();
    const audioUrl = uploadData.upload_url;

    // Submit the audio for transcription
    const transcriptResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        "Authorization": API_KEYS.ASSEMBLYAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_url: audioUrl,
      }),
    });

    if (!transcriptResponse.ok) {
      throw new Error("Failed to submit transcription job");
    }

    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;

    // Poll for transcription completion
    let transcriptionComplete = false;
    let transcriptionText = "";
    
    while (!transcriptionComplete) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const checkResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        method: "GET",
        headers: {
          "Authorization": API_KEYS.ASSEMBLYAI_API_KEY,
        },
      });
      
      if (!checkResponse.ok) {
        throw new Error("Failed to check transcription status");
      }
      
      const checkData = await checkResponse.json();
      
      if (checkData.status === "completed") {
        transcriptionComplete = true;
        transcriptionText = checkData.text;
      } else if (checkData.status === "error") {
        throw new Error("Transcription failed");
      }
    }
    
    return transcriptionText;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    toast.error("Failed to transcribe audio");
    throw error;
  }
};
