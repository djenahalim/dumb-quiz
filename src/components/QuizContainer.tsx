import { useQuiz } from "@/contexts/QuizContext";
import { quizData } from "@/lib/quiz-data";
import { QuizQuestion } from "./QuizQuestion";
import { QuizHUD } from "./QuizHud";
import { QuizGameOver } from "./QuizGameOver";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function QuizContainer() {
  const { 
    currentQuestionIndex, 
    isGameOver, 
    moveToNextQuestion, 
    selectedAnswer,
    showExplanation 
  } = useQuiz();
  
  if (isGameOver) {
    return <QuizGameOver />;
  }
  
  const currentQuestion = quizData[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] p-4">
      <QuizHUD />
      
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <QuizQuestion question={currentQuestion} />
      </motion.div>
      
      {showExplanation && (
        <div className="mt-6">
          <Button 
            onClick={moveToNextQuestion} 
            size="lg"
            className="animate-pulse"
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </div>
      )}
    </div>
  );
}