//DOM ELEMENTS 
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizScreen =document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan =document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan =document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar  = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan =document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");



// to get all the ids used in the html code
const allIds = Array.from(document.querySelectorAll("[id]"))
                    .map(el => el.id);

console.log(allIds);

const quizQuestions =[
    {
        question:"What is the capital of France?",
        answers: [
        {text:"London" , correct:false},
        {text:"Berlin",correct:false},
        {text:"Paris",correct:true},
        {text:"Madrid" ,correct:false},
    ],
    },
    {
        question:"Which plannet is known as the Red Planer?",
        answers:[
            {text:"Venus",correct:false},
            {text:"Marse",correct:true},
            {text:"Jupiter",correct:false},
            {text:"Earth",correct:false}
        ],
    },
    {
        question:"Which fundamental force is responsible for holding the protons and neutrons together in an atomic nucleus?",
        answers:[
            {text:"Gravitational force" , correct:false},
            {text:" Electromagnetic force" , correct:false},
            {text:"Strong nuclear force" , correct:true},
            {text:"Weak nuclear force" , correct:false},
        ],
    },
    {
        question:"Which is the longest river in the world when measured from its ultimate source to its outflow?",
        answers:[
            {text:"Amazon River" , correct:false},
            {text:"Nile River" , correct:true},
            {text:"Yangtze River" , correct:false},
            {text:"Mississippi River" , correct:false},
        ],
    },
    {
        question:`In computing, what do the letters\"URL"\ stand for?`,
        answers:[
            {text:"Uniform Resource Locator" , correct:true},
            {text:"Universal Routing Link" , correct:false},
            {text:"Unified Remote Location" , correct:false},
            {text:"Unidentified Responding Language" , correct:false},
         
        ]
    }

];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//EVEnt LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    console.log("Quiz Started");
    // reset vars
    currentQuestionIndex =0;
    score=0;
    scoreSpan.textContent=0;


    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();

}

function showQuestion(){
    // reset State
    answersDisabled = false;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
// to update the number of question in the text "question index out of 5"
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPercent +"%";
   //to reflect the question on the screen  
    questionText.textContent = currentQuestion.question;
// creating answer button on the page
    answersContainer.innerHTML="";// to remove the previous content and clear the screen

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        
        // what is data set:- it is a property of the button element that allows youto store custom data
        button.dataset.correct =answer.correct;
        button.addEventListener("click",selectAnswer);

        answersContainer.appendChild(button);
    })

}
//adding the options of the answer button
function selectAnswer(event){
    //optimization check
    if(answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct ==="true";
/*Array.from() ka main fayda yehi hai ki jo bhi iterable ya array‑like object hai (jaise NodeList, Set, Map, arguments,
 string, etc.), usko ek real Array me convert kar deta hai. Aur jab wo real Array ban jaata hai,
 tab aap uspe array ke saare methods use kar sakte ho — jaise .forEach(), .map(), .filter(), .reduce(), etc.*/
    Array.from(answersContainer.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");

        }else if(button === selectedButton){
            button.classList.add("incorrect");

        }

    });
    if(isCorrect){
        score++;
    scoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        //check if there are more questions or if the quiz is over
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion()
        }else{
            showResults()
        }
    },1000)
}

function showResults(){
   
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;


    const percentage = (score/quizQuestions.length)*100;

    if(percentage===100){
        resultMessage.textContent = "Perfect! You are a genius!!";
    }else if(percentage>=80){
        resultMessage.textContent ="Great job! You know your stuff!!!";

    }else if(percentage>=60){
        resultMessage.textContent = "Good effort!! Keep learning!";
    }else if(percentage>=40){
        resultMessage.textContent="Not bad! Try Again to improve!!"
    }else {
        resultMessage.textContent = "Keep studying!! you'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}
