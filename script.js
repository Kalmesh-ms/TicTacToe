gameBoard = function(){

gameBoardArr = [1,2,3,4,5,6,7,8,9]


    function remove (value){
        let index = gameBoardArr.indexOf(value);
        if ( index > -1){
            valueArr = gameBoardArr.splice(index , 1);
            value = valueArr.pop();
            return value;
        }
        else return;
    }


return {gameBoardArr, remove};

}

let x = gameBoard().remove(9);
let y = gameBoard().remove(10);

console.log(x);
console.log(x);
console.log(gameBoardArr);