import { useEffect, useState, useRef } from "react";
import { useQuiz } from "@/contexts/QuizContext";

const NUM_FISH = 6;
const NUM_BUBBLES = 10;
const NUM_SEAWEED = 0;

function getRandomFish() {
  const types = ["🐟", "🐠", "🐡", "🐳"];
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomDirection() {
  return Math.random() > 0.5 ? -1 : -1;
}

function getRandomPosition(max: number) {
  return Math.random() * max;
}

export function UnderseaKeyGame() {
  const { checkAnswer, selectedAnswer } = useQuiz();
  const [message, setMessage] = useState("");
  const [fishStates, setFishStates] = useState(() =>
    Array.from({ length: NUM_FISH }).map(() => ({
      x: getRandomPosition(300),
      y: getRandomPosition(300),
      dx: getRandomDirection() * (1 + Math.random() * 1),
      dy: getRandomDirection() * (0.5 + Math.random() * 1),
      flip: false,
      type: getRandomFish(),
    }))
  );
  setTimeout(() => {
     setMessage("Hint: the answer is a keyboard key 😊");
  }, 18000);
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: NUM_BUBBLES }).map(() => ({
      x: getRandomPosition(400),
      y: 400 + Math.random() * 100,
    }))
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && !selectedAnswer) {
        checkAnswer("success");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [checkAnswer, selectedAnswer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFishStates((prev) =>
        prev.map((fish) => {
          let newX = fish.x + fish.dx;
          let newY = fish.y + fish.dy;
          let flip = fish.flip;

          const container = containerRef.current;
          const width = container?.offsetWidth || 500;
          const height = container?.offsetHeight || 400;

          if (newX <= 0 || newX >= width - 40) {
            newX = Math.max(0, Math.min(newX, width - 40));
            fish.dx *= -1;
            flip = !flip;
          }

          const seabedHeight = 96;
          const fishSize = 40;
          const maxY = height - seabedHeight - fishSize;

          if (newY <= 0 || newY >= maxY) {
            newY = Math.max(0, Math.min(newY, maxY));
            fish.dy *= -1;
          }

          return { ...fish, x: newX, y: newY, dx: fish.dx, dy: fish.dy, flip };
        })
      );

      setBubbles((prev) =>
        prev.map((bubble) => {
          let newY = bubble.y - 2;
          if (newY < -10) newY = 400 + Math.random() * 100;
          return { ...bubble, y: newY };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 bg-blue-300 overflow-hidden rounded-md border border-blue-500"
    >
      {/* Seabed */}
      <div className="absolute bottom-0 w-full h-24 bg-yellow-300 z-10 flex justify-evenly items-end">
        {Array.from({ length: NUM_SEAWEED }).map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-16 bg-green-700 rounded-full animate-pulse"
            style={{ height: `${40 + Math.random() * 40}px` }}
          />
        ))}
      </div>

      {/* Fish */}
      {fishStates.map((fish, idx) => (
        <div
          key={idx}
          className="absolute text-2xl"
          style={{
            left: fish.x,
            top: fish.y,
            transform: `scaleX(${fish.flip ? -1 : 1})`,
            transition: "transform 0.2s",
          }}
        >
          {fish.type}
        </div>
      ))}

      {/* Bubbles */}
      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          className="absolute w-2 h-2 bg-white rounded-full opacity-70"
          style={{ left: bubble.x, top: bubble.y }}
        />
      ))}

      {/* Instructions */}
      {!selectedAnswer && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-semibold text-lg z-20">
          {/* Press <kbd className="bg-white text-black px-2 rounded">C</kbd> to catch a fish! */}
        </div>
      )}

      {/* Success message */}
      {(
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white z-30">
          {message}
        </div>
      )}
    </div>
  );
}
