
import { toast } from "sonner";
import { API_KEYS } from "@/config/api-keys";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

export const searchYouTubeVideos = async (query: string, maxResults: number = 10): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&type=video&key=${API_KEYS.YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube videos");
    }

    const data = await response.json();
    
    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    }));
    
    return videos;
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    toast.error("Failed to fetch YouTube videos");
    return [];
  }
};

export const getYouTubeVideoById = async (videoId: string): Promise<YouTubeVideo | null> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEYS.YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube video");
    }

    const data = await response.json();
    
    if (data.items.length === 0) {
      return null;
    }
    
    const item = data.items[0];
    
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    };
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    toast.error("Failed to fetch YouTube video");
    return null;
  }
};
