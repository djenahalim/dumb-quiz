import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function TinyButtonGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [explanation, setExplanation] = useState("");

  const correctChoice = "big";

  const handleClick = (choice: string) => {
    if (selectedAnswer) return;
    if (choice === correctChoice) {
      checkAnswer("success");
      // setExplanation("I had to make it big to fit the word 'tiny' in it");
    } else {
      checkAnswer("fail");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-xl font-bold">Press the tiny button</div>

      <div className="flex gap-6">
        {/* Tiny button (wrong) */}
        <Button
          onClick={() => handleClick("tiny")}
          disabled={!!selectedAnswer}
          className={cn(
            "bg-red-500 hover:bg-red-600 text-white",
            "text-xs"
          )}
            style={{borderRadius: "50%",height:20,width:20,padding:0,marginTop:50,marginRight:50,marginLeft:20}}
        >
          {/* no text inside */}
        </Button>

        {/* Big button with word "Tiny" (correct) */}
        <Button
          onClick={() => handleClick("big")}
          disabled={!!selectedAnswer}
          className={cn(
            "bg-red-500 hover:bg-red-600 text-white",
            "h-32 w-32 text-lg"
          )}
            style={{borderRadius: "50%"}}
        >
          Tiny
        </Button>
      </div>

      {/* Explanation text after correct answer */}
      {explanation && (
        <div className="mt-4 text-center text-gray-700 font-medium">
          {explanation}
        </div>
      )}
    </div>
  );
}
