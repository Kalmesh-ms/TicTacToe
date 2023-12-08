function gameBoardFn(){
    let a1, b1, c1, a2, b2, c2, a3, b3, c3;
    let gameboardArr = [a1, b1, c1, a2, b2, c2, a3, b3, c3];
    start(gameboardArr)
    console.log(gameboardArr)
}

function start(arr){
    for ( let i = 0; i < arr.length ; i++){
        arr[i] = false;
    }
}

gameBoardFn();