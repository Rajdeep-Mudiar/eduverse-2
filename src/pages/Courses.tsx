
import SearchInput from "@/components/SearchInput";
import CourseCard from "@/components/CourseCard";
import { ChevronDown } from "lucide-react";

const Courses = () => {
  // Sample course data
  const courses = [
    {
      title: "JavaScript for Beginners",
      description: "Learn the basics of JavaScript.",
      image: "https://via.placeholder.com/300x200?text=Programming",
      rating: 4.5,
      progress: 65
    },
    {
      title: "UI/UX Design Principles",
      description: "Master the art of user experience design.",
      image: "https://via.placeholder.com/300x200?text=Design",
      rating: 4.8,
      progress: 30
    },
    {
      title: "Digital Marketing 101",
      description: "Learn how to market effectively online.",
      image: "https://via.placeholder.com/300x200?text=Marketing",
      rating: 4.6,
      progress: 80
    },
    {
      title: "Data Science Basics",
      description: "Introduction to data analysis and AI.",
      image: "https://via.placeholder.com/300x200?text=Data+Science",
      rating: 4.7,
      progress: 45
    },
    {
      title: "Cybersecurity Fundamentals",
      description: "Protect systems from cyber threats.",
      image: "https://via.placeholder.com/300x200?text=Cybersecurity",
      rating: 4.5,
      progress: 20
    },
    {
      title: "Entrepreneurship Guide",
      description: "How to start and grow your own business.",
      image: "https://via.placeholder.com/300x200?text=Business",
      rating: 4.9,
      progress: 10
    }
  ];

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Explore Our Courses</h1>
        
        <div className="w-full md:w-auto">
          <SearchInput placeholder="Search courses..." className="w-full md:w-64" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button className="px-4 py-2 bg-eduverse-purple text-white rounded-full text-sm">
          All Categories
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center">
          Difficulty
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center">
          Duration
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center">
          Rating
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            image={course.image}
            rating={course.rating}
            progress={course.progress}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="edu-primary-button flex items-center gap-2 px-6">
          Explore More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Courses;
