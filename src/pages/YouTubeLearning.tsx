
import { useState } from "react";
import { Search, Play, BookmarkPlus, Clock, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { searchYouTubeVideos, YouTubeVideo } from "@/lib/youtube";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

const YouTubeLearning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedVideos, setSavedVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    setIsLoading(true);
    try {
      const results = await searchYouTubeVideos(searchQuery);
      setVideos(results);
      if (results.length === 0) {
        toast.info("No videos found");
      }
    } catch (error) {
      console.error("Error searching videos:", error);
      toast.error("Failed to search videos");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveVideo = (video: YouTubeVideo) => {
    if (!savedVideos.some(v => v.id === video.id)) {
      setSavedVideos([...savedVideos, video]);
      toast.success("Video saved to your learning list");
    } else {
      toast.info("Video already in your learning list");
    }
  };
  
  const handleRemoveVideo = (videoId: string) => {
    setSavedVideos(savedVideos.filter(v => v.id !== videoId));
    toast.success("Video removed from your learning list");
  };
  
  const handlePlayVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">YouTube Learning</h1>
        
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search for educational videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
              {isLoading ? "" : "Search"}
            </Button>
          </div>
          
          <Tabs defaultValue="search" className="w-full">
            <TabsList>
              <TabsTrigger value="search">Search Results</TabsTrigger>
              <TabsTrigger value="saved">Saved Videos</TabsTrigger>
              {selectedVideo && <TabsTrigger value="player">Video Player</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="search">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="aspect-video relative cursor-pointer" 
                           onClick={() => handlePlayVideo(video)}>
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{video.channelTitle}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handlePlayVideo(video)}>
                          <Play className="h-4 w-4 mr-2" /> Play
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleSaveVideo(video)}>
                          <BookmarkPlus className="h-4 w-4 mr-2" /> Save
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  {isLoading ? "Searching for videos..." : "Search for educational videos to start learning"}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {savedVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedVideos.map((video) => (
                    <Card key={video.id}>
                      <div className="aspect-video relative cursor-pointer" 
                           onClick={() => handlePlayVideo(video)}>
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{video.channelTitle}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handlePlayVideo(video)}>
                          <Play className="h-4 w-4 mr-2" /> Play
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveVideo(video.id)}>
                          <Clock className="h-4 w-4 mr-2" /> Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  You haven't saved any videos yet
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="player">
              {selectedVideo && (
                <div className="space-y-4">
                  <div className="aspect-video w-full">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Badge variant="outline">{selectedVideo.channelTitle}</Badge>
                      <span>{new Date(selectedVideo.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-4">{selectedVideo.description}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" onClick={() => handleSaveVideo(selectedVideo)}>
                        <BookmarkPlus className="h-4 w-4 mr-2" /> Save to Library
                      </Button>
                      <Button variant="ghost">
                        <ThumbsUp className="h-4 w-4 mr-2" /> Like
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default YouTubeLearning;
