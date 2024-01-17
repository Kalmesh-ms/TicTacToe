const selectBox = document.querySelector('.select-box'),
selectXBtn = selectBox.querySelector('.playerX'),
selectOBtn = selectBox.querySelector('.playerO'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players');


window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {  
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";

//player function
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`
        players.classList.add("active");
        playerSign = "O"
        element.setAttribute("id" , playerSign)
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`
        players.classList.add("active");
        element.setAttribute("id" , playerSign)
    }
    element.style.pointerEvents = "none" ;
    let randomDelayTime = ((Math.random()* 1000) + 100).toFixed();
    setTimeout(() => {
        bot();
    }, randomDelayTime);
}

//bot function
function bot(){
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0 ){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
            players.classList.remove("active");
            playerSign = "X";
            allBox[randomBox].setAttribute("id" , playerSign);
        }else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id" , playerSign);
        }
    }
    allBox[randomBox].style.pointerEvents = "none";
}

function getId(idName){
    return document.querySelector(".box" + idName).id
}

function checkForWinner(val1 , val2 , val3 , sign){
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign){
        return true;
    }
}