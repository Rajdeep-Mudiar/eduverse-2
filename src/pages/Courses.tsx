
import SearchInput from "@/components/SearchInput";
import CourseCard from "@/components/CourseCard";
import { ChevronDown } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { MotionContainer, MotionChild, MotionItem } from "@/components/MotionWrapper";

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
    <PageTransition>
      <div className="container mx-auto p-6">
        <MotionItem variant="slide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Explore Our Courses</h1>
            
            <div className="w-full md:w-auto">
              <SearchInput placeholder="Search courses..." className="w-full md:w-64" />
            </div>
          </div>
        </MotionItem>

        <MotionContainer className="flex flex-wrap gap-4 mb-6">
          <MotionChild>
            <button className="px-4 py-2 bg-eduverse-purple text-white rounded-full text-sm hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
              All Categories
            </button>
          </MotionChild>
          <MotionChild>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
              Difficulty
              <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
          </MotionChild>
          <MotionChild>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
              Duration
              <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
          </MotionChild>
          <MotionChild>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
              Rating
              <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
          </MotionChild>
        </MotionContainer>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => (
            <MotionChild key={index}>
              <CourseCard
                title={course.title}
                description={course.description}
                image={course.image}
                rating={course.rating}
                progress={course.progress}
              />
            </MotionChild>
          ))}
        </MotionContainer>

        <MotionItem variant="scale" delay={0.5}>
          <div className="flex justify-center">
            <button className="edu-primary-button flex items-center gap-2 px-6 transform transition-transform hover:scale-105 hover:shadow-lg">
              Explore More
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform group-hover:translate-y-1" 
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
        </MotionItem>
      </div>
    </PageTransition>
  );
};

export default Courses;
