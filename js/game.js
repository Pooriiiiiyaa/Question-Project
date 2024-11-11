const level = localStorage.getItem("level") || "medium" ;

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
const BOUNES = 10;
const loader = document.getElementById("loader")
const error = document.getElementById("error")
const scoreText = document.getElementById("scores")
const container = document.getElementById("container")
const questionText = document.getElementById("question-text")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const answerList = document.querySelectorAll(".answer-text")
const questionNumber = document.getElementById("question-number")
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;
const formatData = questionData => {
    const result = questionData.map(item => {
        const questionObject = {question : item.question};
        const answers = [...item.incorrect_answers];
        const correctIndex = Math.floor(Math.random() * 4);
        answers.splice(correctIndex , 0 , item.correct_answer);
        questionObject.answers = answers;
        questionObject.correctIndex = correctIndex;
        return questionObject
    })
    return result ;
}

const fetchData = async()=> {
    try {
        const response = await fetch(URL)
        const json = await response.json();
        formattedData = formatData(json.results)
    start();
    } catch (err) {
        loader.style.display = "none" ;
        error.style.display = "block" ;
        
    }
}
const start = () => {
    showQuestion();
    loader.style.display = "none"
    container.style.display = "block"
}
const showQuestion = () => {
    questionNumber.innerText = questionIndex + 1
    const {answers , question , correctIndex} = formattedData[questionIndex]
    correctAnswer = correctIndex ;
    console.log(correctAnswer);
    questionText.innerText = question ;
    answerList.forEach((btn , index)=> {
        btn.innerText = answers[index]
    })
}
const showAnswer = (event,index) => {
    if(!isAccepted) return
    isAccepted = false
    const isCorrect = index === correctAnswer ? true : false ;
    if(isCorrect) {
        event.target.classList.add("correct");
        score += BOUNES
        scoreText.innerText = score
    }else{
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct")
    }
}

const nextHandler = () => {
    questionIndex++;
    if(questionIndex < formattedData.length){
        isAccepted = true ;
        showQuestion(); 
        deleteClassList();
    }else{
        finishHandler();
    }
}
const deleteClassList = ()=> {
    answerList.forEach((button)=> {
        (button.className = "answer-text")
    })
}
const finishHandler = ()=> {
    localStorage.setItem("score" , JSON.stringify(score))
    window.location.assign("/end.html")
}




window.addEventListener("load" , fetchData);
answerList.forEach((button , index) => {
    button.addEventListener(("click") , (event) => showAnswer(event , index))
})
nextButton.addEventListener("click" , nextHandler)
finishButton.addEventListener("click" , finishHandler)