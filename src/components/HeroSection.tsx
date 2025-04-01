
import { Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-hero-gradient p-8 text-white mb-8">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/4">
            <div className="flex items-center gap-4 mb-4">
              <Rocket className="h-12 w-12" />
              <h1 className="text-4xl font-bold">Welcome to EduVerse</h1>
            </div>
            <p className="text-xl mb-6 opacity-90 italic">
              "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela
            </p>
          </div>
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 rounded-full bg-white opacity-5"></div>
    </div>
  );
};

export default HeroSection;
