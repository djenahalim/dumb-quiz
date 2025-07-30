import { useQuiz } from "@/contexts/QuizContext";
import { quizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";

export function QuizHUD() {
  const { currentQuestionIndex, lives, score } = useQuiz();
  
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-4 px-4">
      <div className="flex items-center space-x-2">
        <span className="font-bold">Lives:</span>
        <div className="flex">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={cn("text-2xl", i < lives ? "text-red-500" : "text-gray-300")}>
              ❤️
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <span className="font-bold">
          Question {currentQuestionIndex + 1}/{quizData.length}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="font-bold">Score:</span>
        <span className="text-xl font-bold">{score}</span>
      </div>
    </div>
  );
}