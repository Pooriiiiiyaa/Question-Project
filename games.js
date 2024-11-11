const URL = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;


const BOUNES = 50 ;
const loader = document.getElementById("loader")
const scoreText = document.getElementById("scores")
const container = document.getElementById("container")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const questionNumber = document.getElementById("question-number")


let formattedData = null ;
let questionIndex = 0
let correctAnswer = null;
let isAccepted = true;
let score = 0


const formatData = (questionData) => {
    const result = questionData.map(item => {
        const objectData = {question : item.question};
        const answers = [...item.incorrect_answers] ;
        const correctIndex = Math.floor(Math.random() * 4)  //0 , 1 , 2 , 3
        answers.splice(correctIndex , 0 , item.correct_answer) ;
        objectData.answers = answers ;
        objectData.correctIndex = correctIndex;
        return objectData ;
    }) ;
    return result
}


const fetchHandler = async() => {
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json.results);
    formattedData = formatData(json.results);
    // console.log(formattedData);
    start();
}


const start = () => {
    showQuestion(); 
    loader.style.display = "none";
    container.style.display = "block";
}


const showQuestion = () => {
    const {answers , question , correctIndex} = formattedData[questionIndex];
    questionText.innerText = question ;
    correctAnswer = correctIndex ;
    console.log(correctAnswer);
    answerList.forEach((btn , index) => {
        btn.innerText = answers[index];
    })
}


const checkAnswer = (evemt ,index) => {
    if(!isAccepted) return ;
    isAccepted = false ;
    const isCorrect = index === correctAnswer ? true : false ;
    if(isCorrect){
        evemt.target.classList.add("correct")
        score += BOUNES ;
        scoreText.innerText = score
    }else{
        evemt.target.classList.add("incorrect")
        answerList[correctAnswer].classList.add("correct")
    }
}


const nextHandler = () => {
    questionIndex++ ;
    if(questionIndex < formattedData.length){
        deleteClassList();
        showQuestion();
        isAccepted = true
        questionNumber.innerText = questionIndex + 1
    }else{
        finishHandler()
    }
}


const deleteClassList = () => {
    answerList.forEach(btn=> {
        btn.className = "answer-text"
    })
}


const finishHandler = () => {
    localStorage.setItem("score" , JSON.stringify(score));
    window.location.assign("end.html")
}


answerList.forEach((button ,index) => {
    button.addEventListener("click" , (evemt) => checkAnswer(evemt,index))
})
window.addEventListener("load" , fetchHandler)
nextButton.addEventListener("click" , nextHandler)
finishButton.addEventListener("click" , finishHandler)




