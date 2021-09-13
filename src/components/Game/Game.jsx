import React, { useState, useRef, useEffect } from 'react';
import { isWon, findOptimalPosition } from '../../utils'
import Message from "../Message/Message";
import Board from "../Board/Board";
import Reset from "../Reset/Reset";
import style from './Game.module.css';
import { computerAnswerSpeed } from "../../constants";

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(""));

    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Start game");
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            if (isPlayer === '0') {
                sleep(computerAnswerSpeed).then(() => {
                    computerTurn();
                })
            }
        } else {
            mounted.current = true;
        }
    }, [isPlayer]);

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
        if (isPlayer !== "X" || board[pos] !== "") {
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const computerTurn = () => {
        const pos = findOptimalPosition(board);
        if (board[pos] !== "") {
            return;
        }
        console.log(pos);
        const boardCopy = updateBoard(pos);
        prepareForNextMove(boardCopy);
    }

    return (
        <div className={style.game__style}>
            <Message value={message}/>
            <Board onClick={handleInput} value={board} />
            {/*<Board onClick={control(isPlayer)} value={board} />*/}
            <Reset onClick={reset} value={'Refresh'} />
        </div>
    );
};

export default Game;
