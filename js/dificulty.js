const buttons = document.querySelectorAll("button")


const selectHandler = (event) => {
    const level = event.target.innerText.toLowerCase() ;
    localStorage.setItem("level" , level)
    window.location.assign("game.html")
}

buttons.forEach((btn) => {
    btn.addEventListener("click" , selectHandler)
})


export {level}