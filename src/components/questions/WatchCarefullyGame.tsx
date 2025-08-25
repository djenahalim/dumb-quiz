import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function WatchCarefullyGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [questionText, setQuestionText] = useState("Watch carefully...");
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [canChoose, setCanChoose] = useState(false);

  const choices = [" ", " ", " ", " "]; // all blank
  const correctIndex = 2; // third button is correct

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start flash
    
      setIsFlashing(true);
      setFlashIndex(correctIndex);

      // End flash after 100ms
      setTimeout(() => {
        setIsFlashing(false);
        setFlashIndex(null);
        setQuestionText("Now choose");
        setCanChoose(true);
      }, 100);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (index: number) => {
    if (!canChoose || selectedAnswer) return;
    if (index === correctIndex) {
      checkAnswer("success");
    } else {
      checkAnswer("fail");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl font-bold text-center">{questionText}</div>
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!canChoose || !!selectedAnswer}
            className={cn(
              "h-16 text-lg",
              isFlashing && flashIndex === index
                ? "bg-green-500 text-white"
                : isFlashing && index !== correctIndex
                ? "bg-red-500 text-white"
                : ""
            )}
          >
            {choice}
          </Button>
        ))}
      </div>
    </div>
  );
}
