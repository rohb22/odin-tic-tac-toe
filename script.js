const X = 'X';
const O = 'O';

const emptyBoard = () => {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    return {board}
};

const player = (name) => {
    let wins = 0
    return {name, wins};
}

function winner(board) {

    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[2][i] === board[0][i]){
            return board[0][i];
        }
        
        if (board[i][0] === board[i][1] && board[i][2] === board[i][0]){
            return board[i][0];
        }
        
    }

    if (board[0][0] === board[1][1] && board[2][2] === board[0][0]){
        return board[0][0];
    }

    if (board[0][2] === board[1][1] && board[2][0] === board[0][2]){
        return board[0][2];
    }

    return null
}


function playerTurn(board){
    let x = 0;
    let o = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === X) {
                x++;
            }
            if (board[i][j] === O) {
                o++;
            }
        }
        
    } 

    if (x === 0 || x === o) {
        return X;
    } else {
    turn = O;
        return O;
    }

}

function move(board, row, col){
    if (board[row][col] !== null) {
        return
    }
    board[row][col] = playerTurn(board);
}

function terminal(board) {
    if (winner(board) !== null) {
        return true;
    }

    if (board[0].indexOf(null) === -1 && board[1].indexOf(null) === -1 && board[2].indexOf(null) === -1) {
        return true;
    }

    return false
}


let gameBoard = emptyBoard();
let player1;
let player2;

document.querySelector("#register").addEventListener('click', () => {
    player1 = player(document.querySelector('#p1name').value);
    player2 = player(document.querySelector('#p2name').value);
    
    document.querySelector(".modalcontainer").style.display = "none";

    document.querySelector('#p1namecon').innerHTML = player1.name;
    document.querySelector('#p2namecon').innerHTML= player2.name;

    document.querySelector('#p1score').innerHTML = player1.wins;
    document.querySelector('#p2score').innerHTML = player2.wins;
    
})

function clearTiles(){
    tiles.forEach(tile => {
        tile.innerHTML = '';
    })
}

function updateWins() {
    document.querySelector('#p1score').innerHTML = player1.wins;
    document.querySelector('#p2score').innerHTML = player2.wins;
}

function nextRound() {
    const container = document.querySelector('.nextroundcontainer');
    container.style.display = 'block';

    const result = document.querySelector('.result');
    if (winner(gameBoard.board) === X) {
        result.innerHTML = `The winner is ${player1.name} "X"`;
    }
    if (winner(gameBoard.board) === O) {
        result.innerHTML = `The winner is ${player2.name} "O"`;
    }

    if (winner(gameBoard.board) === null) {
        result.innerHTML = `The Game is Draw`;
    }

    document.querySelector("#nextroundbtn").addEventListener('click', () => {
        container.style.display = 'none';
    })
}

function gameOver() {
    clearTiles();
    if (winner(gameBoard.board) === X) {
        player1.wins++;
    } if (winner(gameBoard.board) === O) {
        player2.wins++;
    };
    updateWins();
    nextRound();
    gameBoard = emptyBoard();
}

const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
        const tile = e.target;
        const row = tile.dataset["row"];
        const col = tile.dataset["col"];

        if (tile.innerHTML === "") {
            tile.innerHTML = playerTurn(gameBoard.board);
        }
        move(gameBoard.board, row, col);
        if (terminal(gameBoard.board)) {
            gameOver();
        };
    })
})



