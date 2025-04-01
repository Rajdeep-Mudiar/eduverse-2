
import { BarChart3, Clock, Award, BookOpen } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <Clock className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Learning Time</p>
            <h3 className="text-2xl font-bold">12.5 hrs</h3>
          </div>
        </div>

        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <BookOpen className="h-6 w-6 text-green-700 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Courses Enrolled</p>
            <h3 className="text-2xl font-bold">6</h3>
          </div>
        </div>

        <div className="edu-card flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <Award className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Certificates</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="edu-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Learning Progress</h2>
            <select className="text-sm p-1 border rounded">
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Learning statistics chart</span>
          </div>
        </div>

        <div className="edu-card">
          <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-gray-700">
              <p className="text-sm font-medium">JavaScript Assignment</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Web Development</span>
                <span>Due Tomorrow</span>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
              <p className="text-sm font-medium">UI/UX Design Project</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Design Principles</span>
                <span>Due in 3 days</span>
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-gray-700">
              <p className="text-sm font-medium">Marketing Quiz</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Digital Marketing</span>
                <span>Due in 5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
