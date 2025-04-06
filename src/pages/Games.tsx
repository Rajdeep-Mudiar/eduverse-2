
import SearchInput from "@/components/SearchInput";
import GameCard from "@/components/GameCard";
import PageTransition from "@/components/PageTransition";
import { MotionContainer, MotionChild, MotionItem } from "@/components/MotionWrapper";
import { ChevronDown } from "lucide-react";

const Games = () => {
  // Sample game data with difficulty levels
  const games = [
    {
      title: "Brain Teasers",
      description: "Challenge your mind with puzzles.",
      image: "https://via.placeholder.com/300x200?text=Puzzle+Game",
      difficulty: "beginner" as const
    },
    {
      title: "Math Mania",
      description: "Fun math problems to solve.",
      image: "https://via.placeholder.com/300x200?text=Math+Game",
      difficulty: "intermediate" as const
    },
    {
      title: "Chess Master",
      description: "Test your strategy skills in chess.",
      image: "https://via.placeholder.com/300x200?text=Chess",
      difficulty: "advanced" as const
    },
    {
      title: "Space Invaders",
      description: "Classic arcade shooting game.",
      image: "https://via.placeholder.com/300x200?text=Action+Game",
      difficulty: "beginner" as const
    },
    {
      title: "Word Scramble",
      description: "Improve your vocabulary skills.",
      image: "https://via.placeholder.com/300x200?text=Word+Game",
      difficulty: "intermediate" as const
    },
    {
      title: "Physics Playground",
      description: "Learn science through experiments.",
      image: "https://via.placeholder.com/300x200?text=Science+Game",
      difficulty: "advanced" as const
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <MotionItem variant="slide" className="mb-6">
          <h1 className="text-3xl font-bold">Play & Learn with Games</h1>
        </MotionItem>
        
        <MotionItem variant="fade" delay={0.2} className="mb-8">
          <SearchInput placeholder="Search games..." />
        </MotionItem>
        
        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {games.map((game, index) => (
            <MotionChild key={index}>
              <GameCard
                title={game.title}
                description={game.description}
                image={game.image}
                difficulty={game.difficulty}
              />
            </MotionChild>
          ))}
        </MotionContainer>
        
        <MotionItem variant="scale" delay={0.4}>
          <div className="edu-card p-4 bg-green-600 hover:bg-green-700 transition-colors text-white text-center hover:scale-[1.02] transform transition-transform">
            <button className="w-full flex items-center justify-center gap-2 text-lg font-medium">
              <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              Explore More
            </button>
          </div>
        </MotionItem>
      </div>
    </PageTransition>
  );
};

export default Games;
