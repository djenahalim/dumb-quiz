import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function TwentyOneGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [dotPlaced, setDotPlaced] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const choices = ["2.123...", "11", "Nobody knows", "Math"];
  const correctAnswer = "2.1"; // user must form this by dragging dot between 2 and 1

  const toggleOption = (choice: string) => {
    if (!selectedAnswer) {
      setSelectedOptions(new Set([choice]));
      checkAnswer("fail");
    }
  };

  const handleDrop = () => {
    setDotPlaced(true);
    setDragOver(false);
  };

  const handleCorrectClick = () => {
    if (!selectedAnswer) {
      checkAnswer("success");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center space-x-2">
         {!dotPlaced && ( <span className="absolute question-number"
         style={{ top: 25, left: 25 }}
        >21&nbsp;</span>
            )}
        {!dotPlaced && (
          <div
            className=" absolute w-1 h-1 bg-black rounded-full cursor-grab"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", "dot")}
           style={{ top: 50, left: 50 }}
          />
        )}
        <div
          className={cn(
            "absolute ml-4  flex items-center justify-center w-2 h-2",
            dragOver ? "bg-yellow-100" : ""
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{ top: 50, left: 35 }}
        >
          {dotPlaced ? (
            <button
              className="text-xl font-bold text-green-600  cursor-pointer"
              onClick={handleCorrectClick}
            >
              2.1
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((choice, index) => (
          <Button
            key={index}
            variant={selectedAnswer === choice ? "default" : "outline"}
            className={cn(
              "h-16 text-md",
              selectedAnswer &&
                selectedAnswer !== choice &&
                selectedAnswer !== correctAnswer &&
                choice !== correctAnswer
                ? "opacity-50"
                : "",
              selectedAnswer === choice && choice === correctAnswer
                ? "bg-green-500 hover:bg-green-600"
                : "",
              selectedAnswer === choice && choice !== correctAnswer
                ? "bg-red-500 hover:bg-red-600"
                : "",
              selectedOptions.has(choice) ? "border-blue-500 border-2" : ""
            )}
            onClick={() => toggleOption(choice)}
            disabled={!!selectedAnswer}
          >
            {choice}
          </Button>
        ))}
      </div>
    </>
  );
}
