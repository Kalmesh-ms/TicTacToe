function gameBoard (){

    const hashBoard = [0,1,2,3,4,5,6,7,8];

    const PlayerX = {
        name : "playerOne",
        marker : "X",
        crossBoxValues : [],
    }

    const PlayerO = {
        name : "playerTwo",
        marker : "O",
        crossBoxValues : [],
        fun: () => {
            console.log("fun");
        }
    }

    console.log("gameON")

    return { hashBoard, PlayerO , PlayerX};
}

gameBoard();

 gameBoard().PlayerO.fun();
