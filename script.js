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
    }

    return { hashBoard, PlayerO , PlayerX};
}

function gameController (){

    board = gameBoard().hashBoard;


    getPlayerO = gameBoard().PlayerO;
    getPlayerX = gameBoard().PlayerX;

    console.log(getPlayerO)

    function cross (value){
        let index = board.indexOf(value);
        if ( index > -1){
            valueArr = board.splice(index , 1);
            value = valueArr.pop();
            this.crossBoxValues.push(value);
            return value;
        }
        else return;
    }




    return {cross, getPlayerO , getPlayerX};


}

gameController();

