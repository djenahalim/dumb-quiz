import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizData } from "@/lib/quiz-data";
import { motion } from "framer-motion";

export function QuizGameOver() {
  const { score, hasWon, resetQuiz } = useQuiz();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <Card className="p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">
          {hasWon ? "Congratulations!" : "Game Over!"}
        </h2>
        
        <div className="mb-8">
          <p className="text-xl">
            {hasWon
              ? "You've completed the Impossible Quiz!"
              : "You ran out of lives!"}
          </p>
          <p className="text-2xl font-bold mt-4">
            Your score: {score}/{quizData.length}
          </p>
          
          {score === quizData.length ? (
            <p className="mt-4 text-green-600">Perfect Score! You're a genius... or a cheater! 🧐</p>
          ) : score >= quizData.length / 2 ? (
            <p className="mt-4 text-blue-600">Not bad! But there's room for improvement!</p>
          ) : (
            <p className="mt-4 text-amber-600">Well... they don't call it "Impossible" for nothing!</p>
          )}
        </div>
        
        <Button onClick={resetQuiz} size="lg" className="w-full">
          Try Again
        </Button>
      </Card>
    </motion.div>
  );
}