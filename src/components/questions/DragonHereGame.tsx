import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/contexts/QuizContext";

export function DragonHereGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [dragOver, setDragOver] = useState(false);
  const [onPlaced, setOnPlaced] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    if (data === "on") {
      setOnPlaced(true);
      setDragOver(false);
      if (!selectedAnswer) {
        checkAnswer("success");
      }
    } else {
      // optional: give feedback for wrong drop
      setDragOver(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center space-y-6"
      style={{ minHeight: 500 }}
    >
      {/* Word "dragon" with draggable 'on' */}
      <div className="flex text-3xl font-bold">
        <span>drag</span>
        {!onPlaced && (
          <span
            className="px-0 rounded cursor-grab"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", "on")}
          >
            on
          </span>
        )}
        <span>&nbsp;here</span>
      </div>

      {/* Arrow + images */}
      <img
        src="/src/assets/dragon.png"
        className="absolute top-4 left-1"
        height={300}
        width={300}
      />
      <img
        src="/src/assets/here.png"
        className="absolute"
        height={100}
        width={100}
        style={{ right: 118, top: -14 }}
      />

      {/* Drop target */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold absolute ",
          dragOver ? "bg-blue-100" : "border-gray-400"
        )}
        style={{ right: 135, top: 90 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {onPlaced ? (
          <span className="bg-green-400 px-0 rounded text-white">on</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
