const score = JSON.parse(localStorage.getItem("score"))
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scoresEle = document.querySelector("p")
const button = document.querySelector("button")
const input = document.querySelector("input")
scoresEle.innerText = score ;
const saveHandler = () => {
    if(!input.value || !score){
        prompt("Invalid username or scores!!")
    }else{
        const finalScore = {name : input.value , score : score}
        highScores.push(finalScore)
        highScores.sort((a , b) => b.score - a.score)
        highScores.splice(10);
        localStorage.setItem("highScores" , JSON.stringify(highScores));
        localStorage.removeItem("score")
        window.location.assign("scores.html")
    }
}


button.addEventListener("click" , saveHandler)