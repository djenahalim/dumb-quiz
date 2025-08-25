import { useState, useRef } from "react";
import { useQuiz } from "@/contexts/QuizContext";

export function DotMazeGame() {
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
    { top: "50%", left: "5%" },
    { top: "45%", left: "7%" },
    { top: "40%", left: "10%" },
    { top: "42%", left: "12%" },
    { top: "45%", left: "15%" },
    { top: "50%", left: "17%" },
    { top: "55%", left: "20%" },
    { top: "57%", left: "23%" },
    { top: "60%", left: "25%" },
    { top: "55%", left: "27%" },
    { top: "50%", left: "30%" },
    { top: "46%", left: "32%" },
    { top: "42%", left: "35%" },
    { top: "45%", left: "37%" },
    { top: "48%", left: "40%" },
    { top: "53%", left: "42%" },
    { top: "56%", left: "45%" },
    { top: "58%", left: "48%" },
    { top: "62%", left: "50%" },
    { top: "60%", left: "52%" },
    { top: "58%", left: "55%" },
    { top: "54%", left: "58%" },
    { top: "50%", left: "60%" },
    { top: "46%", left: "62%" },
    { top: "42%", left: "65%" },
    { top: "40%", left: "68%" },
    { top: "38%", left: "70%" },
    { top: "42%", left: "72%" },
    { top: "45%", left: "75%" },
    { top: "50%", left: "77%" },
    { top: "55%", left: "80%" },
    { top: "58%", left: "82%" },
    { top: "60%", left: "85%" },
    { top: "57%", left: "88%" },
    { top: "52%", left: "90%" },
    { top: "51%", left: "92%" },
    { top: "50%", left: "95%" },
    { top: "50%", left: "97%" },
    { top: "50%", left: "100%" },
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
          className="absolute w-6 h-6 bg-blue-500 rounded-full top-1/2 left-5 transform -translate-y-1/2 z-10 cursor-pointer"
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
            className="absolute w-6 h-6 bg-green-500 rounded-full top-[50%] left-[98%] transform -translate-y-1/2 z-20 cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
