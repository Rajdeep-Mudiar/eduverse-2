
import { useState, useEffect } from 'react';
import { Search, Play, Bookmark, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration?: string;
}

const YOUTUBE_API_KEY = "AIzaSyDngv12cn_HZvmwqmS1uxRMiHXpGVpYczk";

const YouTubeLearning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedVideos, setSavedVideos] = useState<YouTubeVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [category, setCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'programming', label: 'Programming' },
    { value: 'languages', label: 'Languages' },
    { value: 'history', label: 'History' },
  ];

  useEffect(() => {
    // Load saved videos from local storage
    const saved = localStorage.getItem('eduverse_saved_videos');
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }

    // Load initial videos
    searchVideos('educational videos for students');
  }, []);

  const searchVideos = async (query: string = searchQuery) => {
    if (!query) return;
    
    setLoading(true);
    try {
      let finalQuery = query;
      if (category !== 'all') {
        finalQuery = `${query} ${category} educational`;
      }
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(finalQuery)}&type=video&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      
      // Get additional video details including duration
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch video details');
      }
      
      const detailsData = await detailsResponse.json();
      
      const formattedVideos = data.items.map((item: any) => {
        const details = detailsData.items.find((detail: any) => detail.id === item.id.videoId);
        const duration = details ? convertDuration(details.contentDetails.duration) : '';
        
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          duration
        };
      });
      
      setVideos(formattedVideos);
    } catch (error) {
      console.error('Error searching videos:', error);
      toast.error('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const convertDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    const hours = match && match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    const minutes = match && match[2] ? parseInt(match[2].slice(0, -1)) : 0;
    const seconds = match && match[3] ? parseInt(match[3].slice(0, -1)) : 0;
    
    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes.toString().padStart(hours ? 2 : 1, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return result;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchVideos();
  };

  const playVideo = (video: YouTubeVideo) => {
    setActiveVideo(video);
  };

  const saveVideo = (video: YouTubeVideo) => {
    const isAlreadySaved = savedVideos.some(v => v.id === video.id);
    
    if (isAlreadySaved) {
      const updated = savedVideos.filter(v => v.id !== video.id);
      setSavedVideos(updated);
      localStorage.setItem('eduverse_saved_videos', JSON.stringify(updated));
      toast.info('Video removed from saved list');
    } else {
      const updated = [...savedVideos, video];
      setSavedVideos(updated);
      localStorage.setItem('eduverse_saved_videos', JSON.stringify(updated));
      toast.success('Video saved to your library');
    }
  };

  const isSaved = (videoId: string) => {
    return savedVideos.some(v => v.id === videoId);
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">YouTube Learning</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="mb-6">
                <div className="aspect-video w-full bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.id}`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{activeVideo.title}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activeVideo.channelTitle} • {activeVideo.publishedAt}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => saveVideo(activeVideo)}
                      className={isSaved(activeVideo.id) ? "text-yellow-500" : ""}
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      {isSaved(activeVideo.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                  <p className="mt-4">{activeVideo.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                <p className="text-gray-500 dark:text-gray-400">Select a video to play</p>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Videos</h2>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <Input
                  placeholder="Search for educational videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      variant={category === cat.value ? "default" : "outline"}
                      className="whitespace-nowrap"
                      onClick={() => {
                        setCategory(cat.value);
                        searchVideos(searchQuery);
                      }}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {loading ? (
                  Array(6).fill(0).map((_, i) => (
                    <Card key={i} className="p-3">
                      <Skeleton className="h-32 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </Card>
                  ))
                ) : (
                  videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-32 object-cover cursor-pointer"
                          onClick={() => playVideo(video)} 
                        />
                        {video.duration && (
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 
                          className="font-medium line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => playVideo(video)}
                        >
                          {video.title}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400">{video.channelTitle}</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={isSaved(video.id) ? "text-yellow-500" : ""}
                            onClick={() => saveVideo(video)}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="saved">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="saved" className="flex-1">Saved Videos</TabsTrigger>
                <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved">
                <h3 className="text-lg font-medium mb-3">Your Library</h3>
                {savedVideos.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No saved videos yet. Click the bookmark icon to save videos.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedVideos.map((video) => (
                      <div 
                        key={video.id} 
                        className="flex gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                        onClick={() => playVideo(video)}
                      >
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{video.channelTitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recommended">
                <h3 className="text-lg font-medium mb-3">Educational Picks</h3>
                <div className="space-y-2">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Mathematics
                    </h4>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm" 
                      onClick={() => {
                        setSearchQuery('mathematics tutorials');
                        setCategory('math');
                        searchVideos('mathematics tutorials');
                      }}
                    >
                      Explore Math Videos
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Programming
                    </h4>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm"
                      onClick={() => {
                        setSearchQuery('programming for beginners');
                        setCategory('programming');
                        searchVideos('programming for beginners');
                      }}
                    >
                      Explore Coding Videos
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      History
                    </h4>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm"
                      onClick={() => {
                        setSearchQuery('world history');
                        setCategory('history');
                        searchVideos('world history');
                      }}
                    >
                      Explore History Videos
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default YouTubeLearning;
