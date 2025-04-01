
import SearchInput from "@/components/SearchInput";
import WebinarCard from "@/components/WebinarCard";
import { CalendarDays, Users } from "lucide-react";

const Webinars = () => {
  // Sample webinar data
  const webinars = [
    {
      title: "Introduction to AI",
      description: "Learn how Artificial Intelligence is transforming industries.",
      image: "https://via.placeholder.com/300x200?text=AI+Webinar",
      isLive: true
    },
    {
      title: "Scaling Your Business",
      description: "Discover key strategies to grow your startup to success.",
      image: "https://via.placeholder.com/300x200?text=Business+Growth",
      isLive: true
    },
    {
      title: "Future of Work",
      description: "How remote work is reshaping the global workforce.",
      image: "https://via.placeholder.com/300x200?text=Future+Work",
      isLive: false
    },
    {
      title: "Cybersecurity Essentials",
      description: "Learn how to protect your digital assets from threats.",
      image: "https://via.placeholder.com/300x200?text=Cybersecurity",
      isLive: false
    }
  ];

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Join Our Live Webinars</h1>
      
      <SearchInput placeholder="Search Webinars..." className="mb-8" />
      
      <div className="edu-card mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-eduverse-purple"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold ml-2">About This Webinar Platform</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          EduVerse Webinars bring industry experts to your screen, providing interactive learning experiences. Get insights, ask questions, and level up your skills.
        </p>
      </div>
      
      <div className="flex items-center mb-6">
        <CalendarDays className="h-6 w-6 mr-2 text-gray-500" />
        <h2 className="text-2xl font-bold">Upcoming Webinars</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {webinars.map((webinar, index) => (
          <WebinarCard
            key={index}
            title={webinar.title}
            description={webinar.description}
            image={webinar.image}
            isLive={webinar.isLive}
          />
        ))}
      </div>
      
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 mr-2 text-gray-500" />
        <h2 className="text-2xl font-bold">Featured Speakers</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="edu-card text-center">
          <img
            src="https://via.placeholder.com/150?text=Speaker"
            alt="Speaker"
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="text-lg font-semibold">Dr. Sarah Johnson</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">AI Research Scientist</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Leading expert in machine learning and neural networks with over 10 years of experience.
          </p>
        </div>
        
        <div className="edu-card text-center">
          <img
            src="https://via.placeholder.com/150?text=Speaker"
            alt="Speaker"
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="text-lg font-semibold">Mark Williams</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Startup Founder & CEO</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Serial entrepreneur who has successfully founded and exited three tech startups.
          </p>
        </div>
        
        <div className="edu-card text-center">
          <img
            src="https://via.placeholder.com/150?text=Speaker"
            alt="Speaker"
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="text-lg font-semibold">Emily Chen</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">UX Design Director</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Award-winning designer who has worked with Fortune 500 companies to improve user experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Webinars;
