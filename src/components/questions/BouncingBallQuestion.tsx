// components/questions/BouncingBallQuestion.tsx
import { useState, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";

export function BouncingBallQuestion() {
  const { checkAnswer } = useQuiz();
  const [position, setPosition] = useState({ top: 100, left: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.random() * 200;
      const left = Math.random() * 200;
      setPosition({ top, left });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    checkAnswer("clickball"); // Must match correctAnswer in data
  };

  return (
    <div className="relative w-full h-64 border border-gray-300 rounded-md">
      <div
        onClick={handleClick}
        className="w-8 h-8 bg-red-500 rounded-full cursor-pointer absolute transition-all duration-300"
        style={{ top: position.top, left: position.left }}
      />
    </div>
  );
}
