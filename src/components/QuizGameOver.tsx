import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizData } from "@/lib/quiz-data";
import { motion } from "framer-motion";

export function QuizGameOver() {
  const { score, hasWon, resetQuiz,lives } = useQuiz();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <Card className="p-8 shadow-lg">
       
        
        <div className="mb-8">
          <h2 className="text-xl">
            {hasWon
              ? "You've completed the Dumb Quiz!"
              : "You ran out of lives!"}
          </h2>
          <p className="text-2xl font-bold mt-4">
            Your score: {score}/{quizData.length}
          </p>
          
          {lives === 3 ? (
              <>
              <p className="mt-4 text-green-600">Perfect Score! But I’m sure you had to play this quiz so many times — so go get a life!</p>
              <div className="mt-6 flex justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-green-600 flex items-center justify-center text-green-600 text-5xl font-bold">
                A
              </div>
            </div>
              </>
            
          ) : (lives > 0 ?(
            <>
            <p className="mt-4 text-red-600"> This is OUTRAGEOUS! You are absolutely useless! You barely finished the dumb quiz, and what is with all the lives you’ve lost?  
              My suggestion is you try again — if you dare!</p>
             <div className="mt-6 flex justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-red-600 flex items-center justify-center text-red-600 text-5xl font-bold">
                  F
                </div>
              </div>
              </>
          ): (    <> <p className="mt-4 text-red-600"> Congratulations! You’ve unlocked the secret ending: <b>total embarrassment!</b> you are as dumb as a bag of sand! Replay and pretend this never happened.</p>
                  <div className="mt-6 flex justify-center">
      <div className="w-20 h-20 rounded-full border-4 border-red-600 flex items-center justify-center text-red-600 text-5xl font-bold">
        F
      </div>

     
    </div>
          </>))}
            <p className="mt-4 text-black-600"><b>Love from Halim Djenaoucine😊</b></p>
        </div>
        
        <Button onClick={resetQuiz} size="lg" className="w-full">
          Try Again
        </Button>
      </Card>
    </motion.div>
  );
}