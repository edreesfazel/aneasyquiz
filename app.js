const questions = [
    {
        question: "Who is the best defender in the NBA?",
        answers: [
            { text: "Anthony Davis", correct: true},
            { text: "Giannis Antetokounmpo", correct: false},
            { text: "Rudy Gobert", correct: false},
            { text: "Marcus Smart", correct: false},

        ]
    },
    {
        question: "Which team has the best jersey colors in the NBA?",
        answers: [
            { text: "Bucks", correct: false},
            { text: "Grizzlies", correct: false},
            { text: "Heat", correct: false},
            { text: "Lakers", correct: true},

        ]
    },
    {
        question: "Who is the best coach in the NBA?",
        answers: [
            { text: "Gregg Popovich", correct: false},
            { text: "Erik Spoelstra", correct: false},
            { text: "Darvin Ham", correct: true},
            { text: "Steve Kerr", correct: false},

        ]
    },
    {
        question: "Which team has the best logo?",
        answers: [
            { text: "Lakers", correct: true},
            { text: "Celtics", correct: false},
            { text: "Warriors", correct: false},
            { text: "Suns", correct: false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
          button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})




startQuiz();