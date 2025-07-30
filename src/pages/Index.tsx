import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizProvider } from "@/contexts/QuizContext";
import { QuizContainer } from "@/components/QuizContainer";

export default function ImpossibleQuizGame() {
  const [gameStarted, setGameStarted] = useState(false);
  
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <h1 className="text-5xl font-extrabold text-white mb-6">
            The <span className="text-yellow-400">Impossible</span> Quiz
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            Think you're smart? This quiz will prove otherwise! 
            With trick questions, unexpected answers, and mind-bending challenges,
            you'll need more than just knowledge to succeed.
          </p>
          
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setGameStarted(true)} 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-8 py-6"
              >
                Start the Madness!
              </Button>
            </motion.div>
            
            <p className="text-white/70 text-sm">
              Warning: May cause frustration, laughter, and severe questioning of your intelligence.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <QuizProvider>
        <QuizContainer />
      </QuizProvider>
    </div>
  );
}