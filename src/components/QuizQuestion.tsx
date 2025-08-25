import { useState, useEffect, useRef } from "react";
import { Question } from "@/lib/quiz-data";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BouncingBallQuestion } from "@/components/questions/BouncingBallQuestion";
import { DotMazeGame } from "@/components/questions/DotMazeGame";
import { DotMazeBridgeGame } from "@/components/questions/DotMazeBridgeGame";
import { UnderseaKeyGame } from "@/components/questions/UnderseaKeyGame";
import { TwentyOneGame } from "@/components/questions/TwentyOneGame";
import { TwentySixGame } from "@/components/questions/TwentySixGame";
import { ClickTheSmallestGame } from "@/components/questions/ClickTheSmallestGame";
import { DragonHereGame } from "@/components/questions/DragonHereGame";
import { DotMazeOffscreenGame } from "@/components/questions/DotMazeOffscreenGame";
import { WatchCarefullyGame } from "@/components/questions/WatchCarefullyGame";
import { TinyButtonGame } from "@/components/questions/TinyButtonGame";
import { MemorySequenceGame } from "@/components/questions/MemorySequenceGame";


interface QuizQuestionProps {
  question: Question;
}

function getCustomComponentForSpecialAction(action?: string) {
    
  switch (action) {

    case "customBouncingBall":
      return <BouncingBallQuestion />;
    case "dotMaze":
      return <DotMazeGame />;
    case "dotMazeBridge":
      return <DotMazeBridgeGame />;
     case "seaGame":
      return <UnderseaKeyGame />;
    case "twentyOne":
      return <TwentyOneGame />;
    case "twentySix":
      return <TwentySixGame />;
        case "clickTheSmallest":
      return <ClickTheSmallestGame />;
          case "dragonHere":
      return <DragonHereGame />;
    case "dotMazeOffscreen":
      return <DotMazeOffscreenGame />;
    case "watchCarefully":
      return <WatchCarefullyGame />;
      case 'tinyButton':
        return <TinyButtonGame />
         case 'MemorySequence':
        return <MemorySequenceGame />
      
    //  Add more custom games here
    default:
      return null;
  }
}

export function QuizQuestion({ question }: QuizQuestionProps) {
  const {
    checkAnswer,
    executeSpecialAction,
    selectedAnswer,
    showExplanation,
    questionTimer,
    setQuestionTimer,
    specialAction,
    currentQuestionIndex
  } = useQuiz();

  const [timeLeft, setTimeLeft] = useState<number | null>(questionTimer);
  const [isShaking, setIsShaking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [revealedColor, setRevealedColor] = useState<string | null>(null);
  
  const questionTextRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  
  // Setup for special actions
  useEffect(() => {
    if (specialAction === "findHiddenObject" && mouseRef.current) {
      // Create moving mouse effect
      const mouseMoveInterval = setInterval(() => {
        if (mouseRef.current) {
          const randomX = Math.random() * 300 - 150;
          const randomY = Math.random() * 100 - 50;
          mouseRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
      }, 800);
      
      return () => clearInterval(mouseMoveInterval);
    }
    
    if (specialAction === "shakeScreen") {
      window.addEventListener("devicemotion", handleDeviceMotion);
      return () => window.removeEventListener("devicemotion", handleDeviceMotion);
    }
    
    if (specialAction === "pressEsc") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [specialAction]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft === null || selectedAnswer) return;
    
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      checkAnswer("timeout");
    }
  }, [timeLeft, selectedAnswer, checkAnswer]);
  
  // Handle device motion for shake detection
  const handleDeviceMotion = (e: DeviceMotionEvent) => {
    if (e.acceleration && 
        e.acceleration.x && 
        e.acceleration.y && 
        e.acceleration.z &&
        Math.abs(e.acceleration.x) > 15 || 
        Math.abs(e.acceleration.y) > 15 || 
        Math.abs(e.acceleration.z) > 15) {
      setIsShaking(true);
      executeSpecialAction("shakeScreen");
    }
  };
  
  // Simulate shaking with mouse movements (for desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (specialAction === "shakeScreen" && !selectedAnswer) {
      // Track rapid mouse movements
      const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
      if (speed > 30) {
        setIsShaking(true);
        executeSpecialAction("shakeScreen");
      }
    }
  };
  
  // Handle ESC key for special action
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && specialAction === "pressEsc") {
      executeSpecialAction("pressEsc");
    }
  };
  
  // Handle drag for revealing hidden colors
  const handleDragStart = () => {
    if (specialAction === "dragQuestion") {
      setIsDragging(true);
    }
  };
  
  const handleDragEnd = () => {
    if (specialAction === "dragQuestion") {
      setRevealedColor("bg-purple-500");
      executeSpecialAction("dragQuestion");
    }
  };
  
  // Handle clicking on mouse for "findHiddenObject"
  const handleMouseClick = () => {
    if (specialAction === "findHiddenObject") {
      executeSpecialAction("findHiddenObject");
    }
  };
  
  // Handle clicking on dot for "clickTextDot"
  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (specialAction === "clickTextDot") {
      executeSpecialAction("clickTextDot");
    }
  };
  
  // Handle waiting for "wait" action
  useEffect(() => {
    if (questionTimer && !selectedAnswer) {
      const waitTimer = setTimeout(() => {
        if (!selectedAnswer) {
          executeSpecialAction("wait");
          checkAnswer("wait");
        }
      }, questionTimer * 1000);
      
      return () => clearTimeout(waitTimer);
    }
  }, [questionTimer, selectedAnswer, executeSpecialAction, checkAnswer,currentQuestionIndex]);
  
  // Handle selecting all options
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  
  const toggleOption = (choice: string) => {
    if (specialAction === "selectAll") {
      const newSelected = new Set(selectedOptions);
      if (newSelected.has(choice)) {
        newSelected.delete(choice);
      } else {
        newSelected.add(choice);
      }
      setSelectedOptions(newSelected);
      
      // Check if all options are selected
      if (newSelected.size === question.choices.length) {
        executeSpecialAction("selectAll");
      }
    } else {
      checkAnswer(choice);
    }
  };

  const customGameComponent = getCustomComponentForSpecialAction(question.specialAction);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "w-full max-w-2xl mx-auto", 
        isShaking ? "animate-shake" : "",
        revealedColor
      )}
      onMouseMove={handleMouseMove}
      draggable={specialAction === "dragQuestion"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
     
      <Card className="p-6 shadow-lg relative">
        {question.specialAction !== 'twentyOne' ?(
          <span className="question-number">{currentQuestionIndex == 12 ? '' : currentQuestionIndex + 1}.</span>
        ):(
          <div className="mb-6"></div>
        )
        }
      
        {/* Timer if present */}
        {timeLeft !== null && (
          <div className="mb-4">
            <Progress value={(timeLeft / (questionTimer || 1)) * 100} className="h-2" />
            <p className="text-right text-sm text-muted-foreground mt-1">{timeLeft}s</p>
          </div>
        )}
        
        {/* Question text with potential special elements */}
        <div 
          ref={questionTextRef}
          className="text-2xl font-bold mb-6 text-center relative"
        >
          {specialAction === "clickTextDot" ? (
            <div>
              Cl<span 
                ref={dotRef}
                onClick={handleDotClick}
                className="cursor-pointer hover:text-blue-500 inline-block"
                style={{position: "relative"}}
              >i<span 
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onClick={handleDotClick}
              ></span></span>ck the smallest c<span 
                className="cursor-pointer hover:text-blue-500 inline-block"
              >i</span>rcle
            </div>
          ) : (
            question.text
          )}
          
          {/* Hidden mouse for findHiddenObject */}
          {specialAction === "findHiddenObject" && (
            <div 
              ref={mouseRef}
              onClick={handleMouseClick}
              className="absolute text-xs cursor-pointer hover:text-blue-500"
              style={{ top: "50%", left: "50%", fontSize: "10px" }}
            >
              🐭
            </div>
          )}
        </div>
        
        {/* Answer options */}
        {/* If there's a custom component for this question, show it instead of choices */}
      {customGameComponent ? (
        <div className="my-4">{customGameComponent}</div>
      )  : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.choices.map((choice, index) => (
            <Button
              key={index}
              variant={selectedAnswer === choice ? "default" : "outline"}
              className={cn(
                "h-16 text-md",
                selectedAnswer && selectedAnswer !== choice && selectedAnswer !== question.correctAnswer && 
                  choice !== question.correctAnswer ? "opacity-50" : "",
                selectedAnswer === choice && choice === question.correctAnswer ? "bg-green-500 hover:bg-green-600" : "",
                selectedAnswer === choice && choice !== question.correctAnswer ? "bg-red-500 hover:bg-red-600" : "",
                selectedOptions.has(choice) ? "border-blue-500 border-2" : ""
              )}
              onClick={() => toggleOption(choice)}
              disabled={!!selectedAnswer && specialAction !== "selectAll"}
            >
              {choice}
            </Button>
          ))}
        </div>
        )}
        {/* Explanation when shown */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-3 bg-muted rounded-md"
          >
            <p className="flex justify-center gap-2 font-medium">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-600">Correct!  {question.comment}</span>
              ) : (
                <span className="text-red-600">Wrong!  {question.explanation}</span>
              )}
             
            </p>
          </motion.div>
        )}

        {/* Special hint section - Added to help users */}
        {!selectedAnswer && question.specialAction && (
          <div className="mt-4 p-2 bg-yellow-100 rounded text-sm text-center">
            <p className="font-medium text-yellow-800">
{/*          
              {question.id === 4 && "Hint: Sometimes doing nothing is the best action"}
              {question.id === 5 && "Hint: Look at the dots on the letters"}
              {question.id === 6 && "Hint: Move your mouse/device rapidly"}
              {question.id === 7 && "Hint: Check your lives counter at the top"}
              {question.id === 8 && "Hint: Try dragging the question box"}
              {question.id === 9 && "Hint: Use your keyboard"}
              {question.id === 10 && "Hint: Maybe you need to select more than one option"}
              {question.id === 13 && "Hint: Are you sure about what you're looking for?"}
              {question.id === 14 && "Hint: Try using your keyboard for wisdom"}
              {question.id === 15 && "Hint: Count the letters in the question itself"}
              {question.id === 18 && "Hint: The answer is literally in the question"}
              {question.id === 20 && "Hint: Just like before, patience is key"} */}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}