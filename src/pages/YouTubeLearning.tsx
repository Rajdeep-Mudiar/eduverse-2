import { useState, useEffect } from 'react';
import { Search, Play, Bookmark, Star, Clock, Flame, BookOpen, Code, Lightbulb, Globe } from 'lucide-react';
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
    { value: 'all', label: 'All', icon: BookOpen },
    { value: 'math', label: 'Mathematics', icon: Flame },
    { value: 'science', label: 'Science', icon: Lightbulb },
    { value: 'programming', label: 'Programming', icon: Code },
    { value: 'languages', label: 'Languages', icon: Globe },
    { value: 'history', label: 'History', icon: Clock },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('eduverse_saved_videos');
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }

    searchVideos('educational videos for students');
  }, []);

  const searchVideos = async (query: string = searchQuery) => {
    if (!query) return;
    
    setLoading(true);
    try {
      let finalQuery = query;
      if (category !== 'all') {
        const categoryLabel = categories.find(cat => cat.value === category)?.label || '';
        finalQuery = `${query} ${categoryLabel} educational`;
      }
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(finalQuery)}&type=video&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold">{activeVideo.title}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activeVideo.channelTitle} • {activeVideo.publishedAt}</p>
                    <Button
                      variant={isSaved(activeVideo.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => saveVideo(activeVideo)}
                      className={isSaved(activeVideo.id) ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      {isSaved(activeVideo.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{activeVideo.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-6">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto text-eduverse-purple opacity-50 mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Select a video to play</p>
                </div>
              </div>
            )}
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
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
              
              <div className="overflow-x-auto pb-4 mb-4">
                <div className="flex space-x-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      variant={category === cat.value ? "default" : "outline"}
                      className={`whitespace-nowrap ${category === cat.value ? "bg-eduverse-purple hover:bg-eduverse-purple/90" : ""}`}
                      onClick={() => {
                        setCategory(cat.value);
                        searchVideos(searchQuery);
                      }}
                    >
                      <cat.icon className="h-4 w-4 mr-2" />
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
                    <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                        <div 
                          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer"
                          onClick={() => playVideo(video)}
                        >
                          <Play className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 
                          className="font-medium line-clamp-2 cursor-pointer hover:text-eduverse-purple"
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
                            onClick={(e) => {
                              e.stopPropagation();
                              saveVideo(video);
                            }}
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
            <Tabs defaultValue="saved" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <TabsList className="w-full mb-4 bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="saved" className="flex-1">Saved Videos</TabsTrigger>
                <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved">
                <h3 className="text-lg font-medium mb-3">Your Library</h3>
                {savedVideos.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Bookmark className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No saved videos yet. Click the bookmark icon to save videos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedVideos.map((video) => (
                      <div 
                        key={video.id} 
                        className="flex gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
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
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Flame className="h-4 w-4 mr-2 text-orange-500" />
                      Mathematics
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Explore algebra, calculus, geometry and more</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm mt-2 text-eduverse-purple" 
                      onClick={() => {
                        setSearchQuery('mathematics tutorials');
                        setCategory('math');
                        searchVideos('mathematics tutorials');
                      }}
                    >
                      Explore Math Videos
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Code className="h-4 w-4 mr-2 text-green-500" />
                      Programming
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn coding, web development, and computer science</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm mt-2 text-eduverse-purple"
                      onClick={() => {
                        setSearchQuery('programming tutorials');
                        setCategory('programming');
                        searchVideos('programming tutorials');
                      }}
                    >
                      Explore Coding Videos
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      History
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Discover world history, civilizations, and historical events</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm mt-2 text-eduverse-purple"
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
