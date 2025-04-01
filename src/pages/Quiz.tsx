
import { useState } from "react";
import { Brain, ChevronRight, Check, X } from "lucide-react";

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Sample quiz questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: 1
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
      correctAnswer: 2
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Quiz</h1>
      
      {!quizStarted ? (
        <div className="edu-card text-center p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Brain className="h-12 w-12 text-eduverse-purple" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Challenge yourself with AI-generated quizzes</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Test your knowledge with our smart quizzes that adapt to your skill level and help you learn as you go.
          </p>
          
          <button 
            className="edu-primary-button px-8 py-3 text-lg"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <div className="edu-card text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <div className="text-6xl font-bold mb-6 text-eduverse-purple">
            {score}/{questions.length}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {score === questions.length 
              ? "Perfect score! Amazing job!" 
              : score >= questions.length / 2 
                ? "Good job! Keep learning." 
                : "Keep practicing to improve your score."}
          </p>
          <button 
            className="edu-primary-button px-6 py-2"
            onClick={startQuiz}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="edu-card p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-sm font-medium">
              Score: {score}
            </div>
          </div>
          
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
            <div 
              className="h-2 bg-eduverse-purple rounded-full" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <h3 className="text-xl font-bold mb-6">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border text-gray-800 dark:text-gray-200 transition-colors ${
                  selectedAnswer === index
                    ? isCorrect
                      ? "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-500"
                      : "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-500"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 mr-3">
                    {selectedAnswer === index && (
                      isCorrect ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button 
              className="edu-secondary-button"
              onClick={() => setQuizStarted(false)}
            >
              Quit Quiz
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedAnswer === null ? "Select an answer to continue" : "Moving to next question..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
