export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
  specialAction?: string;
  timer?: number; // Time in seconds for timed questions
}

export const quizData: Question[] = [
  {
    id: 1,
    text: "What is 1+1?",
    choices: ["1", "2", "3", "11"],
    correctAnswer: "2", // Making this a straightforward answer
    explanation: "Just a simple math question to get started!"
  },
  {
    id: 2,
    text: "Which of these is the largest?",
    choices: ["Elephant", "Mount Everest", "Blue Whale", "Universe"],
    correctAnswer: "Universe", // Making this a straightforward answer
    explanation: "The universe contains everything else, so it's definitely the largest!"
  },
  {
    id: 3,
    text: "Complete the sequence: 2, 4, 8, 16, ...",
    choices: ["32", "24", "64", "I don't know"],
    correctAnswer: "clickmouse", // They need to click the mouse image hidden in question
    specialAction: "findHiddenObject",
    explanation: "There was a tiny mouse hidden in the question text! You needed to catch it!"
  },
  {
    id: 4,
    text: "What button should you never press?",
    choices: ["This one", "The red one", "Self-destruct", "Next"],
    correctAnswer: "wait", // They need to wait and not press anything
    timer: 10, // Wait for 10 seconds
    explanation: "The correct answer was to not press anything! Patience is a virtue."
  },
  {
    id: 5,
    text: "Click the smallest circle",
    choices: ["⚪", "⚫", "⚪", "⚫"],
    correctAnswer: "dot", // There's a tiny dot on the i in "circle"
    specialAction: "clickTextDot",
    explanation: "The smallest circle was the dot on the 'i' in 'circle'!"
  },
  {
    id: 6,
    text: "What comes after 2?",
    choices: ["3", "4", "5", "6"],
    correctAnswer: "shake", // Player needs to shake the device/page
    specialAction: "shakeScreen",
    explanation: "An earthquake comes after magnitude 2! You needed to shake your device!"
  },
  {
    id: 7,
    text: "How many lives do you have left?",
    choices: ["3", "2", "1", "0"],
    correctAnswer: "lives", // The actual number of lives they have left
    specialAction: "checkLives",
    explanation: "The correct answer was your actual remaining lives count!"
  },
  {
    id: 8,
    text: "What is the color of this question?",
    choices: ["Blue", "Red", "Green", "Black"],
    correctAnswer: "drag", // Player needs to drag the question to reveal its "true" color
    specialAction: "dragQuestion",
    explanation: "You needed to drag the question to reveal its true color underneath!"
  },
  {
    id: 9,
    text: "How do you continue?",
    choices: ["Press Next", "Skip this question", "Give up", "Try again"],
    correctAnswer: "esc", // Press ESC key
    specialAction: "pressEsc",
    explanation: "You needed to press the Escape key on your keyboard!"
  },
  {
    id: 10,
    text: "Congratulations! This is the final question. What was this quiz?",
    choices: ["Fun", "Impossible", "Tricky", "Annoying"],
    correctAnswer: "all", // Need to select all answers
    specialAction: "selectAll",
    explanation: "It was all of these things! You needed to select all options!"
  },
  {
    id: 11,
    text: "Find the number that doesn't belong",
    choices: ["2", "4", "7", "8"],
    correctAnswer: "7",
    explanation: "All other numbers are even, 7 is the only odd number."
  },
  {
    id: 12,
    text: "Which word is spelled incorrectly in the dictionary?",
    choices: ["Misspelled", "Incorrect", "Wrong", "Improperly"],
    correctAnswer: "Incorrectly",
    explanation: "The word 'incorrectly' is always spelled incorrectly in the dictionary!"
  },
  {
    id: 13,
    text: "Count the black dots",
    choices: ["12", "13", "15", "16"],
    correctAnswer: "0", // The answer is not in the options
    specialAction: "findHiddenObject",
    explanation: "Trick question! There were no black dots on the screen!"
  },
  {
    id: 14,
    text: "Why did the chicken cross the road?",
    choices: ["To get to the other side", "It was being chased", "Exercise", "Food"],
    correctAnswer: "42", // The answer is not in the options
    specialAction: "pressEsc",
    explanation: "42 is the answer to life, the universe, and everything - including why chickens cross roads!"
  },
  {
    id: 15,
    text: "Click on the seventh letter of this question",
    choices: ["T", "H", "E", "N"],
    correctAnswer: "special", // Player needs to click on the 7th letter of the question text
    specialAction: "clickSpecialChar",
    explanation: "The seventh letter of 'Click on the seventh letter of this question' is the 'n' in 'on'!"
  },
  {
    id: 16,
    text: "What disappears when you say its name?",
    choices: ["Shadow", "Echo", "Reflection", "Silence"],
    correctAnswer: "Silence",
    explanation: "When you say 'silence', it disappears!"
  },
  {
    id: 17,
    text: "How do you fit an elephant into a fridge?",
    choices: ["Open door, put elephant in, close door", "Cut the elephant into pieces", "Buy a bigger fridge", "Impossible"],
    correctAnswer: "Open door, put elephant in, close door",
    explanation: "This is the classic joke answer - just open the door, put the elephant in, and close it!"
  },
  {
    id: 18, 
    text: "Find the answer hidden in plain sight",
    choices: ["Here", "There", "Everywhere", "Nowhere"],
    correctAnswer: "sight", // The answer is in the question
    specialAction: "findHiddenObject",
    explanation: "The answer was literally 'in plain SIGHT' - in the question itself!"
  },
  {
    id: 19,
    text: "What's 9 + 10?",
    choices: ["19", "21", "91", "910"],
    correctAnswer: "21", // Internet meme answer
    explanation: "According to the famous meme, 9 + 10 = 21!"
  },
  {
    id: 20,
    text: "This is the final question. Or is it?",
    choices: ["Yes", "No", "Maybe", "I don't know"],
    correctAnswer: "wait", // They need to wait again
    timer: 5,
    explanation: "Sometimes in life, you just need to be patient!"
  }
];