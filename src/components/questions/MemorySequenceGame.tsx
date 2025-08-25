import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/QuizContext";

export function MemorySequenceGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [sequence, setSequence] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState(false);

  const correctSequence = ["blue", "red", "blue", "yellow"];

  const handleClick = (color: string) => {
    if (selectedAnswer) return; // already answered

    const newSequence = [...sequence, color];
    setSequence(newSequence);

    // Check if still matches prefix of correct answer
    if (
      correctSequence.slice(0, newSequence.length).join(",") !==
      newSequence.join(",")
    ) {
      setIsWrong(true);
      checkAnswer("fail");
      return;
    }

    // If full sequence entered
    if (newSequence.length === correctSequence.length) {
      checkAnswer("success");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-bold">I hope you remember</h2>

      <div className="grid grid-cols-2 gap-4">
        {["green", "red", "yellow", "blue"].map((color) => (
          <Button
            key={color}
            onClick={() => handleClick(color)}
            disabled={!!selectedAnswer}
            className="h-16 w-24 text-lg font-semibold text-white"
            style={{
              backgroundColor: color,
              opacity:
                selectedAnswer && !sequence.includes(color) ? 0.6 : 1,
            }}
          >
            {color}
          </Button>
        ))}
      </div>

   
    </div>
  );
}
