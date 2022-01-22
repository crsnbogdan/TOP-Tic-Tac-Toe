const playerFactory = function(name, symbol) {
    let logPlayerInfo = () => { console.log(`player name: ${name}; player symbol: ${symbol}`) };
    return {
        name,
        symbol,
        logPlayerInfo
    }
}

let playerOne = playerFactory(`Player one`, `X`);
let playerTwo = playerFactory(`Player two`, `O`);
const gameBoard = (function() {
            let board = [];
            const gameBoard = document.getElementById(`gameBoard`);
            const restartBtn = document.getElementById(`restartBtn`);

            restartBtn.addEventListener(`click`, () => {
                clearDOMBoard();
                document.getElementById(`gameStatus`).textContent = `it's ${playerOne.name}'s turn`;
            })

            function clearDOMBoard() {
                for (let i = 0; i < 9; i++) {
                    board[i] = ``;
                }
                boardDOMItemsArray.forEach(boardDOMItem => {
                    boardDOMItem.textContent = ``;
                    boardDOMItem.style.backgroundColor = `#83C5BE`;
                })
            }

            //add items to board array and DOM, and associate them with the attribute
            //arrayItemIntex
            for (let i = 0; i < 9; i++) {
                board.push(``);
                let boardDOMItem = document.createElement(`div`);
                boardDOMItem.classList.add(`boardItem`)
                gameBoard.appendChild(boardDOMItem);
                boardDOMItem.setAttribute(`arrayItemIndex`, `${board.length - 1}`)
            }

            const boardDOMItemsArray = Array.from(document.querySelectorAll(`.boardItem`));
            boardDOMItemsArray.forEach(boardDOMItem => {
                        if (boardDOMItem.textContent == playerOne.symbol) {
                            board[`${boardDOMItem.getAttribute(`arrayitemindex`)}`] = boardDOMItem.textContent;
                }
            })
    return {
        board
    }
})();

const gameFlowControl = (function() {
    const gameStatusDOM = document.getElementById(`gameStatus`);
    gameStatusDOM.textContent = `It's ${playerOne.name}'s turn`;
    

    function compareBoardItemSymbols(comparedSymbol) {
        let gameBoardArr = gameBoard.board;
        if(
            gameBoardArr[0] === gameBoardArr[1] && gameBoardArr[0] === gameBoardArr[2]  && gameBoardArr[0] === comparedSymbol ||
            gameBoardArr[3] === gameBoardArr[4] && gameBoardArr[3] === gameBoardArr[5]  && gameBoardArr[3] === comparedSymbol ||
            gameBoardArr[6] === gameBoardArr[7] && gameBoardArr[6] === gameBoardArr[8]  && gameBoardArr[6] === comparedSymbol ||

            gameBoardArr[0] === gameBoardArr[3] && gameBoardArr[0] === gameBoardArr[6]  && gameBoardArr[0] === comparedSymbol ||
            gameBoardArr[1] === gameBoardArr[4] && gameBoardArr[4] === gameBoardArr[7]  && gameBoardArr[4] === comparedSymbol ||
            gameBoardArr[2] === gameBoardArr[5] && gameBoardArr[2] === gameBoardArr[8]  && gameBoardArr[2] === comparedSymbol ||

            gameBoardArr[0] === gameBoardArr[4] && gameBoardArr[4] === gameBoardArr[8]  && gameBoardArr[0] === comparedSymbol ||
            gameBoardArr[2] === gameBoardArr[4] && gameBoardArr[4] === gameBoardArr[6]  && gameBoardArr[2] === comparedSymbol
            ) {
                if(comparedSymbol === playerOne.symbol) {
                    gameStatusDOM.textContent = `the winner is ${playerOne.name}`;
                } else if(comparedSymbol === playerTwo.symbol) {
                    gameStatusDOM.textContent = `the winner is ${playerTwo.name}`;
                }
                return;
            }
        }
        
        function winnerControl() {
            let gameBoardArr = gameBoard.board;
            compareBoardItemSymbols(playerOne.symbol);
            compareBoardItemSymbols(playerTwo.symbol);
            if(gameBoardArr[0] && gameBoardArr[1] && gameBoardArr[2] && gameBoardArr[3] && gameBoardArr[4] && gameBoardArr[5] && gameBoardArr[6] && gameBoardArr[7] && gameBoardArr[8] && !gameStatusDOM.textContent.includes(`winner`)) {
                gameStatusDOM.textContent = `nobody won`;
                return;
            }
    }

    const boardDOMItemsArray = Array.from(document.querySelectorAll(`.boardItem`));
    let playerOneTurn = true;
    let playerTwoTurn = false;

    const restartBtn = document.getElementById(`restartBtn`);
    restartBtn.addEventListener(`click`, () => {
        playerOneTurn = true;
        playerTwoTurn = false; 
    })

    function switchPlayerTurn() {
        if(playerOneTurn && !playerTwoTurn) {
            playerOneTurn = false;
            playerTwoTurn = true;
            gameStatusDOM.textContent = `it's ${playerTwo.name}'s turn`;
            
        }   else if(playerTwoTurn && !playerOneTurn) {
            playerOneTurn = true;
            playerTwoTurn = false;
            gameStatusDOM.textContent = `it's ${playerOne.name}'s turn`;
        }
    }

    boardDOMItemsArray.forEach(boardDOMItem => {
        boardDOMItem.addEventListener(`click`, () => {
            if (gameStatusDOM.textContent.includes(`winner`) || gameStatusDOM.textContent.includes(`draw`)) return;
            if (boardDOMItem.textContent) return;

            if (playerOneTurn === true) {
                boardDOMItem.textContent = `${playerOne.symbol}`;
                gameBoard.board[`${boardDOMItem.getAttribute(`arrayItemIndex`)}`] = playerOne.symbol; 
                boardDOMItem.style.backgroundColor = `#EDF6F9`;               
                switchPlayerTurn();
            }else if (playerTwoTurn === true) {
                boardDOMItem.textContent = `${playerTwo.symbol}`;
                gameBoard.board[`${boardDOMItem.getAttribute(`arrayItemIndex`)}`] = playerTwo.symbol;
                boardDOMItem.style.backgroundColor = `#FFDDD2`;               
                switchPlayerTurn();
            }

            winnerControl();
        })
    });
})();