import { ReactNode } from "react";

export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
  specialAction?: string;
  timer?: number; // Time in seconds for timed questions
  customComponent?: string;
  comment?:string;
  
}

export const quizData: Question[] = [

  {
  id: 1,
  text: "Why do the French tanks have rear-view mirrors?",
  choices: [
    "To make sure they’re reversing in style",
    "To check for baguette delivery trucks",
    "So they can see the battlefield",
    "To make sure their wine rack is secure"
  ],
  correctAnswer: "So they can see the battlefield",
  explanation: "I thought 'So they can see the battlefield' is funnier!",
  comment: "Jokes lol",
},
{
  id: 2,
  text: "How did I escape from Iraq?",
  choices: [
    "I took a Plane-sylvania",
    "I told my friends 'Kuwait for me!'",
    "I made a sand-sational getaway",
    "Iran"
  ],
  correctAnswer: "Iran",
  explanation: "I had to run!",
  comment: "You are ready to be a Dad!",
},
{
  id: 3,
  text: "Catch the red ball before it moves!",
  choices: [],
  correctAnswer: "clickball",
  specialAction: "customBouncingBall",
  comment: "Just checking your reflexes!",
  customComponent: "customBouncingBall",
},
{
  id: 4,
  text: "Which of these place names doesn’t exist?",
  choices: ["Condom", "Twatt", "Bitchfield", "Poopy"],
  correctAnswer: "Poopy",
  explanation: "No place called Poopy, the rest actually exist!",
  comment: "No place called Poopy!",
},
{
  id: 5,
  text: "Don't touch the red!",
  choices: [],
  correctAnswer: "success",
  specialAction: "dotMaze",
  explanation: "You touched the red!",
  comment: "Nice control!",
},
{
  id: 6,
  text: "sdrawkcab noitseuq siht rewsna uoy nac",
  choices: ["sey", "What?", "I don't get it", "What is this?"],
  correctAnswer: "sey",
  explanation: "The question is backwards!",
  comment: "Very smart!",
},
{
  id: 7,
  text: "Why did I name my iPhone the Titanic?",
  choices: [
    "It’s syncing now",
    "It can’t stay afloat with all the updates",
    "It’s always crashing on something",
    "Flooded with old messages"
  ],
  correctAnswer: "It’s syncing now",
  explanation: "ChatGPT thought 'It’s syncing now' is funnier",
  comment: "You are funny!",
},
{
  id: 8,
  text: "Remember: blue → red → blue → yellow",
  choices: [],
  correctAnswer: "success",
  specialAction: "seaGame",
  explanation: "Noice!",
},
{
  id: 9,
  text: "Which is the largest?",
  choices: ["Earth", "Mars", "Milky Way", "Galaxy"],
  correctAnswer: "Earth",
  explanation: "They are all chocolate bars except Earth!",
  comment: "They are all chocolate bars except Earth.",
},
{
  id: 10,
  text: "I had to get rid of my vacuum because:",
  choices: [
    "It was picking up bad habits",
    "It really sucked",
    "It was draining my energy",
    "It was acting like a total dirtbag"
  ],
  correctAnswer: "It really sucked",
  explanation: "It really sucked",
  comment: "It really sucked :D",
},
{
  id: 11,
  text: "Don't touch the red!",
  choices: [],
  correctAnswer: "success",
  specialAction: "dotMazeOffscreen",
  explanation: "You touched the red!",
  comment:
    "Sometimes in life, you have to take a different path to reach where you want to be.",
},
{
  id: 12,
  text: "How many letters in this sentence?",
  choices: ["28", "29", "12", "Who cares"],
  correctAnswer: "12",
  explanation: "'this sentence' has 12 letters!",
  comment: "'this sentence' has 12 letters!",
},
{
  id: 13,
  text: "What is the question number so far?",
  choices: ["11", "12", "13", "14"],
  correctAnswer: "13",
  explanation: "It was 13, mate.",
  comment: "Nice one!",
},
{
  id: 14,
  text: "How many holes in a polo?",
  choices: ["1", "2", "3", "4"],
  correctAnswer: "4",
  explanation: "There are 4 holes in a polo shirt.",
  comment: "Good!",
},
{
  id: 15,
  text: "",
  choices: [],
  correctAnswer: "success",
  specialAction: "dragonHere",
  comment: "That is how you dragon.",
},
{
  id: 16,
  text: "Why did a Mexican throw his wife off a cliff?",
  choices: ["Poncho", "Sombrero", "Fajita", "Tequila"],
  correctAnswer: "Tequila",
  explanation: "Tequila → 'to kill her.' Get it?",
  comment: "To kill her!",
},
{
  id: 17,
  text: "Why shouldn’t you fart in an Apple Store?",
  choices: [
    "You’ll blow their signals",
    "It might trigger the iSmell app",
    "Their iAir doesn't come with a filter",
    "Because they don’t have Windows"
  ],
  correctAnswer: "Because they don’t have Windows",
  explanation: "They don’t have Windows.",
  comment: "",
},
{
  id: 18,
  text: "",
  choices: [],
  correctAnswer: "success",
  specialAction: "tinyButton",
  explanation: "I had to make it big to fit the word 'Tiny' in it 😆",
  comment: "I had to make it big to fit the word 'Tiny' in it 😆",
},
{
  id: 19,
  text: "",
  choices: [],
  correctAnswer: "success",
  specialAction: "MemorySequence",
  explanation: "Already forgot? It was blue → red → blue → yellow.",
  comment: "Nice memory!",
},
{
  id: 20,
  text: "How many lives do you have?",
  choices: ["5", "3", "1", "None, I am playing a dumb quiz"],
  correctAnswer: "None, I am playing a dumb quiz",
  explanation: "I don't think anyone playing this dumb quiz has a life.",
  comment: "But you are hurting my feelings 😭",
},
{
  id: 21,
  text: "21 / 10 = ?",
  choices: [],
  correctAnswer: "success",
  specialAction: "twentyOne",
  explanation:
    "This was pretty hard — you were supposed to drag the dot next to the question number and make 2.1.",
  comment: "Wow, this is impressive! Unless you already knew the answer, then boo.",
},
{
  id: 22,
  text: "What breaks when you say it?",
  choices: ["Silence", "A secret", "A promise", "The ice"],
  correctAnswer: "Silence",
  explanation: "Silence.",
  comment: "",
},
{
  id: 23,
  text: "",
  choices: [],
  correctAnswer: "success",
  specialAction: "watchCarefully",
  explanation: "",
  comment: "",
},
{
  id: 24,
  text: "JFMAMJJASON?",
  choices: ["J", "D", "A", "W"],
  correctAnswer: "D",
  explanation: "December.",
  comment: "",
},
{
  id: 25,
  text: "Click the smallest",
  choices: [],
  correctAnswer: "success",
  specialAction: "clickTheSmallest",
  explanation: "The answer was the dot above the 'i' in “click.”",
  comment: "Very good!",
},
{
  id: 26,
  text: "How many letters in the Alphabet?",
  choices: [],
  correctAnswer: "success",
  specialAction: "twentySix",
  explanation: "The question number...",
},
{
  id: 27,
  text: "Don't touch the red! Hmmm, if only there was a bridge!",
  choices: [],
  correctAnswer: "success",
  specialAction: "dotMazeBridge",
  explanation: "Use right-click!",
  comment: "Unnatural!",
},
{
  id: 28,
  text: "Why is the sand wet?",
  choices: ["Seaweed", "Crab juice", "Rain", "Why is your face stupid?"],
  correctAnswer: "Seaweed",
  explanation: "Sea weed lol.",
  comment: "",
},
{
  id: 29,
  text: "So... the sand is wet because the sea weed on it?!",
  choices: ["No", "Yes", "Maybe", "Balls"],
  correctAnswer: "Yes",
  explanation: "You gotta commit.",
  comment: "If you say so...",
},
{
  id: 30,
  text: "How many bits in a byte?",
  choices: ["1", "8", "255", "Depends on the size of your mouth"],
  correctAnswer: "Depends on the size of your mouth",
  explanation: "Depends on the size of your mouth.",
  comment: "",
},








  // {
  //   id: 11,
  //   text: "What button should you never press?",
  //   choices: ["This one", "The red one", "Self-destruct", "Next"],
  //   correctAnswer: "wait", // They need to wait and not press anything
  //   timer: 10, // Wait for 10 seconds
  //   explanation: "The correct answer was to not press anything! Patience is a virtue."
  // },
  // {
  //   id: 5,
  //   text: "Click the smallest circle",
  //   choices: ["⚪", "⚫", "⚪", "⚫"],
  //   correctAnswer: "dot", // There's a tiny dot on the i in "circle"
  //   specialAction: "clickTextDot",
  //   explanation: "The smallest circle was the dot on the 'i' in 'circle'!"
  // },
  // {
  //   id: 6,
  //   text: "What comes after 2?",
  //   choices: ["3", "4", "5", "6"],
  //   correctAnswer: "shake", // Player needs to shake the device/page
  //   specialAction: "shakeScreen",
  //   explanation: "An earthquake comes after magnitude 2! You needed to shake your device!"
  // },
  // {
  //   id: 7,
  //   text: "How many lives do you have left?",
  //   choices: ["3", "2", "1", "0"],
  //   correctAnswer: "lives", // The actual number of lives they have left
  //   specialAction: "checkLives",
  //   explanation: "The correct answer was your actual remaining lives count!"
  // },
  // {
  //   id: 8,
  //   text: "What is the color of this question?",
  //   choices: ["Blue", "Red", "Green", "Black"],
  //   correctAnswer: "drag", // Player needs to drag the question to reveal its "true" color
  //   specialAction: "dragQuestion",
  //   explanation: "You needed to drag the question to reveal its true color underneath!"
  // },
  // {
  //   id: 9,
  //   text: "How do you continue?",
  //   choices: ["Press Next", "Skip this question", "Give up", "Try again"],
  //   correctAnswer: "esc", // Press ESC key
  //   specialAction: "pressEsc",
  //   explanation: "You needed to press the Escape key on your keyboard!"
  // },
  // {
  //   id: 10,
  //   text: "Congratulations! This is the final question. What was this quiz?",
  //   choices: ["Fun", "Impossible", "Tricky", "Annoying"],
  //   correctAnswer: "all", // Need to select all answers
  //   specialAction: "selectAll",
  //   explanation: "It was all of these things! You needed to select all options!"
  // },
  // {
  //   id: 11,
  //   text: "Find the number that doesn't belong",
  //   choices: ["2", "4", "7", "8"],
  //   correctAnswer: "7",
  //   explanation: "All other numbers are even, 7 is the only odd number."
  // },
  // {
  //   id: 12,
  //   text: "Which word is spelled incorrectly in the dictionary?",
  //   choices: ["Misspelled", "Incorrect", "Wrong", "Improperly"],
  //   correctAnswer: "Incorrectly",
  //   explanation: "The word 'incorrectly' is always spelled incorrectly in the dictionary!"
  // },
  // {
  //   id: 13,
  //   text: "Count the black dots",
  //   choices: ["12", "13", "15", "16"],
  //   correctAnswer: "0", // The answer is not in the options
  //   specialAction: "findHiddenObject",
  //   explanation: "Trick question! There were no black dots on the screen!"
  // },
  // {
  //   id: 14,
  //   text: "Why did the chicken cross the road?",
  //   choices: ["To get to the other side", "It was being chased", "Exercise", "Food"],
  //   correctAnswer: "42", // The answer is not in the options
  //   specialAction: "pressEsc",
  //   explanation: "42 is the answer to life, the universe, and everything - including why chickens cross roads!"
  // },
  // {
  //   id: 15,
  //   text: "Click on the seventh letter of this question",
  //   choices: ["T", "H", "E", "N"],
  //   correctAnswer: "special", // Player needs to click on the 7th letter of the question text
  //   specialAction: "clickSpecialChar",
  //   explanation: "The seventh letter of 'Click on the seventh letter of this question' is the 'n' in 'on'!"
  // },
  // {
  //   id: 16,
  //   text: "What disappears when you say its name?",
  //   choices: ["Shadow", "Echo", "Reflection", "Silence"],
  //   correctAnswer: "Silence",
  //   explanation: "When you say 'silence', it disappears!"
  // },
  // {
  //   id: 17,
  //   text: "How do you fit an elephant into a fridge?",
  //   choices: ["Open door, put elephant in, close door", "Cut the elephant into pieces", "Buy a bigger fridge", "Impossible"],
  //   correctAnswer: "Open door, put elephant in, close door",
  //   explanation: "This is the classic joke answer - just open the door, put the elephant in, and close it!"
  // },
  // {
  //   id: 18, 
  //   text: "Find the answer hidden in plain sight",
  //   choices: ["Here", "There", "Everywhere", "Nowhere"],
  //   correctAnswer: "sight", // The answer is in the question
  //   specialAction: "findHiddenObject",
  //   explanation: "The answer was literally 'in plain SIGHT' - in the question itself!"
  // },
  // {
  //   id: 19,
  //   text: "What's 9 + 10?",
  //   choices: ["19", "21", "91", "910"],
  //   correctAnswer: "21", // Internet meme answer
  //   explanation: "According to the famous meme, 9 + 10 = 21!"
  // },
  // {
  //   id: 20,
  //   text: "This is the final question. Or is it?",
  //   choices: ["Yes", "No", "Maybe", "I don't know"],
  //   correctAnswer: "wait", // They need to wait again
  //   timer: 5,
  //   explanation: "Sometimes in life, you just need to be patient!"
  // },


  // done mini games

   
];