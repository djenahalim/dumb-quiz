import { useState, useRef } from "react";
import { useQuiz } from "@/contexts/QuizContext";

export function DotMazeOffscreenGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [started, setStarted] = useState(false);
  const mazeRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (!selectedAnswer) setStarted(true);
  };

  const handleSuccess = () => {
    if (!selectedAnswer) checkAnswer("success");
  };

  const handleFail = () => {
    if (started && !selectedAnswer) {
      checkAnswer("fail");
    }
  };

  // Curvy path with many white circles
  const pathCircles = [
  
    { top: "50%", left: "0%" },
    { top: "50%", left: "3%" },
    { top: "50%", left: "100%" },
    { top: "50%", left: "97%" },
  ];

  return (
    <div
      ref={mazeRef}
      className="relative w-full h-64 border border-gray-300 overflow-hidden rounded-md"
    >
      {/* Start dot */}
      {!started && (
       <div
        onMouseEnter={handleStart}
        className="absolute w-6 h-6 bg-blue-500 rounded-full top-[50%] left-[3%] transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      />
      )}

      {/* Maze */}
      {started && (
        <>
          {/* Red background - fail zone */}
          <div
            className="absolute inset-0 bg-red-500 transition-all duration-500"
            onMouseEnter={handleFail}
          />

          {/* Safe path (curvy trail of circles) */}
          {pathCircles.map((circle, index) => (
            <div
              key={index}
              className="absolute bg-white w-8 h-8 rounded-full z-10"
              style={{
                top: circle.top,
                left: circle.left,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* End dot */}
          <div
            onMouseEnter={handleSuccess}
            className="absolute w-6 h-6 bg-green-500 rounded-full top-[50%] left-[95%] transform -translate-y-1/2 z-20 cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
