
import { toast } from "sonner";

// API key
const ASSEMBLYAI_API_KEY = "7f32c07d9a6f40b78852dbdb551c65bd";
const ASSEMBLYAI_API_URL = "https://api.assemblyai.com/v2";

interface TranscriptionOptions {
  audioBlob: Blob;
  onProgress?: (text: string) => void;
  onComplete?: (text: string) => void;
  onError?: (error: Error) => void;
}

let socket: WebSocket | null = null;

export const startRealTimeTranscription = ({
  onProgress,
  onComplete,
  onError
}: Omit<TranscriptionOptions, "audioBlob">): { startRecording: () => void; stopRecording: () => void } => {
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      
      // Connect to AssemblyAI websocket
      socket = new WebSocket("wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000");
      
      socket.onopen = () => {
        socket?.send(JSON.stringify({ 
          token: ASSEMBLYAI_API_KEY 
        }));
        
        mediaRecorder?.start(250);
      };
      
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message_type === "FinalTranscript") {
          onProgress?.(data.text);
        }
      };
      
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        onError?.(new Error("WebSocket connection error"));
      };
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socket?.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        // Close the socket
        if (socket?.readyState === WebSocket.OPEN) {
          socket.close();
        }
        
        // Combine audio chunks and transcribe the full recording
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        
        try {
          const transcription = await transcribeAudio({ audioBlob });
          onComplete?.(transcription);
        } catch (error) {
          console.error("Error transcribing complete audio:", error);
          onError?.(new Error("Failed to transcribe complete audio"));
        }
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
    } catch (error) {
      console.error("Error starting recording:", error);
      onError?.(new Error("Failed to access microphone"));
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };
  
  return { startRecording, stopRecording };
};

export const transcribeAudio = async ({ audioBlob }: { audioBlob: Blob }): Promise<string> => {
  try {
    // Upload the audio file
    const uploadResponse = await fetch(`${ASSEMBLYAI_API_URL}/upload`, {
      method: "POST",
      headers: {
        "Authorization": ASSEMBLYAI_API_KEY,
        "Content-Type": "application/octet-stream"
      },
      body: audioBlob
    });
    
    if (!uploadResponse.ok) {
      throw new Error("Failed to upload audio file");
    }
    
    const uploadData = await uploadResponse.json();
    const audioUrl = uploadData.upload_url;
    
    // Start transcription
    const transcriptResponse = await fetch(`${ASSEMBLYAI_API_URL}/transcript`, {
      method: "POST",
      headers: {
        "Authorization": ASSEMBLYAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_code: "en"
      })
    });
    
    if (!transcriptResponse.ok) {
      throw new Error("Failed to start transcription");
    }
    
    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;
    
    // Poll for transcription result
    let result;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resultResponse = await fetch(`${ASSEMBLYAI_API_URL}/transcript/${transcriptId}`, {
        method: "GET",
        headers: {
          "Authorization": ASSEMBLYAI_API_KEY
        }
      });
      
      if (!resultResponse.ok) {
        throw new Error("Failed to fetch transcription result");
      }
      
      result = await resultResponse.json();
    } while (result.status !== "completed" && result.status !== "error");
    
    if (result.status === "error") {
      throw new Error(result.error);
    }
    
    return result.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    toast.error("Failed to transcribe audio");
    return "";
  }
};
