const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which of the following is four-sided in shape?",
        choice1: "Triangle",
        choice2: "Rectangle",
        choice3: "Box",
        choice4: "Circle",
        answer: 2
    },
    {
        question: "How many months do we have in 7 years?",
        choice1: "84 months",
        choice2: "36 months",
        choice3: "86 months",
        choice4: "72 months",
        answer: 1
    },
    {
        question: "Where was COVID-19 first announced?",
        choice1: "Japan",
        choice2: "Nigeria",
        choice3: "America",
        choice4: "China",
        answer: 4
    },
    {
        question: "Simplify 2 + 2(2 * 3) - 5?",
        choice1: "9",
        choice2: "19",
        choice3: "-6",
        choice4: "11",
        answer: 1
    },
    {
        question: "Which of this is not a programming language?",
        choice1: "Python",
        choice2: "Javascript",
        choice3: "C##",
        choice4: "C++",
        answer: 3
    },
]

const CORRECT_BONUS = 3;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html")
    }
    questionCounter ++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();