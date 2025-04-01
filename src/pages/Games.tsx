
import SearchInput from "@/components/SearchInput";
import GameCard from "@/components/GameCard";

const Games = () => {
  // Sample game data
  const games = [
    {
      title: "Brain Teasers",
      description: "Challenge your mind with puzzles.",
      image: "https://via.placeholder.com/300x200?text=Puzzle+Game"
    },
    {
      title: "Math Mania",
      description: "Fun math problems to solve.",
      image: "https://via.placeholder.com/300x200?text=Math+Game"
    },
    {
      title: "Chess Master",
      description: "Test your strategy skills in chess.",
      image: "https://via.placeholder.com/300x200?text=Chess"
    },
    {
      title: "Space Invaders",
      description: "Classic arcade shooting game.",
      image: "https://via.placeholder.com/300x200?text=Action+Game"
    },
    {
      title: "Word Scramble",
      description: "Improve your vocabulary skills.",
      image: "https://via.placeholder.com/300x200?text=Word+Game"
    },
    {
      title: "Physics Playground",
      description: "Learn science through experiments.",
      image: "https://via.placeholder.com/300x200?text=Science+Game"
    }
  ];

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Play & Learn with Games</h1>
      
      <SearchInput placeholder="Search games..." className="mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            image={game.image}
          />
        ))}
      </div>
      
      <div className="edu-card p-4 bg-green-600 hover:bg-green-700 transition-colors text-white text-center">
        <button className="w-full flex items-center justify-center gap-2 text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Games;
