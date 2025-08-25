import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function SevenTeenGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [dotPlaced, setDotPlaced] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const choices = ["Shark Pillow", "Banana Submarine", "Octopus Guitar", "Underwater Toaster"];
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
         {!dotPlaced && ( <span className="absolute question-number hover:bg-green-500 cursor-pointer"
         style={{ top: "10%", left: "4%" }}
          onClick={handleCorrectClick}
        >28&nbsp;</span>
            )}
        {!dotPlaced && (
          <div
            className=" absolute w-1 h-1 bg-black rounded-full "
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", "dot")}
           style={{ top: "17%", left: "7.5%" }}
          />
        )}
        <div
          className={cn(
            "absolute ml-4  flex items-center  justify-center w-2 h-2",
            dragOver ? "bg-yellow-100" : ""
          )}
        
          style={{ top: "17%", left: "5.5%" }}
        >
        
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
