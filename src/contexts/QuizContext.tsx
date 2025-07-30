import { createContext, useContext, useState, ReactNode } from "react";
import { Question, quizData } from "@/lib/quiz-data";

interface QuizContextType {
  currentQuestionIndex: number;
  score: number;
  lives: number;
  isGameOver: boolean;
  hasWon: boolean;
  questionTimer: number | null;
  specialAction: string | null;
  selectedAnswer: string | null;
  showExplanation: boolean;
  moveToNextQuestion: () => void;
  checkAnswer: (answer: string) => void;
  executeSpecialAction: (action: string) => void;
  resetQuiz: () => void;
  setQuestionTimer: (time: number | null) => void;
  setSpecialAction: (action: string | null) => void;
  setSelectedAnswer: (answer: string | null) => void;
  setShowExplanation: (show: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [specialAction, setSpecialAction] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      
      // Set timer if the next question has one
      const nextQuestion = quizData[currentQuestionIndex + 1];
      if (nextQuestion.timer) {
        setQuestionTimer(nextQuestion.timer);
      } else {
        setQuestionTimer(null);
      }
      
      // Set special action if the next question has one
      if (nextQuestion.specialAction) {
        setSpecialAction(nextQuestion.specialAction);
      } else {
        setSpecialAction(null);
      }
    } else {
      // Player completed all questions
      setHasWon(true);
      setIsGameOver(true);
    }
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = quizData[currentQuestionIndex];

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setShowExplanation(true);
    } else {
      setLives(lives - 1);
      if (lives - 1 <= 0) {
        setIsGameOver(true);
      }
      setShowExplanation(true);
    }
  };

  const executeSpecialAction = (action: string) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (action === currentQuestion.specialAction) {
      checkAnswer(currentQuestion.correctAnswer);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setHasWon(false);
    setQuestionTimer(null);
    setSpecialAction(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const value = {
    currentQuestionIndex,
    score,
    lives,
    isGameOver,
    hasWon,
    questionTimer,
    specialAction,
    selectedAnswer,
    showExplanation,
    moveToNextQuestion,
    checkAnswer,
    executeSpecialAction,
    resetQuiz,
    setQuestionTimer,
    setSpecialAction,
    setSelectedAnswer,
    setShowExplanation
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};