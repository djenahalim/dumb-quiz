import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function ClickTheSmallestGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [dotPlaced, setDotPlaced] = useState(false);
  const [dragOver, setDragOver] = useState(false);

 const choices = [
  '<div style="width:8px;height:8px;background:black;border-radius:50%;margin:auto"></div>',
  '<div style="width:12px;height:12px;background:black;border-radius:50%;margin:auto"></div>',
  '<div style="width:16px;height:16px;background:black;border-radius:50%;margin:auto"></div>',
  '<div style="width:20px;height:20px;background:black;border-radius:50%;margin:auto"></div>'
];

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
     
        <div
          className={cn(
            "absolute ml-4  flex items-center  justify-center w-2 h-2 cursor-pointer",
            dragOver ? "bg-yellow-100" : ""
          )}
        onClick={handleCorrectClick}
          style={{ top: 80, left: 244,backgroundColor:"black",borderRadius:'50%',width:5,height:5 }}
        >
        
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
            dangerouslySetInnerHTML={{ __html: choice }}
          >
           
          </Button>
        ))}
      </div>
    </>
  );
}
