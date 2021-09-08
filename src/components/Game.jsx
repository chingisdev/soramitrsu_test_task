import React, { useState } from 'react';
import { isWon, findOptimalPosition } from '../utils'
import Message from "./Message";
import Board from "./Board";
import Reset from "./Reset";

const style = {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(""));

    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Start game");

    const reset = () => {
        setBoard(Array(9).fill(""));
        setMessage('Start game');
        setIsPlayer("X");
    }

    const prepareForNextMove = (boardCopy) => {
        if (isWon(boardCopy)) {
            setMessage(`${isPlayer === 'X' ? 'Player won' : 'Computer won'}`);
            setIsPlayer('');
            return;
        }

        if (boardCopy.indexOf("") === -1) {
            setMessage("Draw");
            setIsPlayer("");
        } else {
            let nextPlayer = isPlayer === "X" ? "0" : "X";
            setIsPlayer(nextPlayer);
            setMessage(`Now is ${nextPlayer}'s move`);
        }
    }

    const handleInput = (pos) => {
        if (isPlayer === "" || board[pos] !== "") {
            return;
        }
        const boardCopy = updateBoard(pos);
        prepareForNextMove(boardCopy);
    }



    const updateBoard = (pos) => {
        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        setBoard(boardCopy);
        return boardCopy;
    }

    const computerTurn = () => {
        const pos = findOptimalPosition(board);
        if (isPlayer === "" || board[pos] !== "") {
            return;
        }
        const boardCopy = updateBoard(pos);
        prepareForNextMove(boardCopy);
    }

    function control(isPlayer) {
        if (isPlayer === "X") {
            return handleInput;
        } else {
            computerTurn(board);
        }
    }

    return (
        <div style={style}>
            <Message value={message}/>
            <Board onClick={control(isPlayer)} value={board} />
            <Reset onClick={reset} value={'Refresh'} />
        </div>
    );
};

export default Game;
