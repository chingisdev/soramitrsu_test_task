import { winningPositions } from "./constants";

export const isWon = (board) => {
    for (let i = 0; i < winningPositions.length; i++) {
        let [a, b, c] = winningPositions[i];
        if (board[a] !== "") {
            if (board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
    }
    return false;
}

const searchPlayerPositions = (board, player) => {
    const result = Array(9).fill(-1)
    for (let i = 0; i < board.length; i++) {
        if (board[i] === player) {
            result[i] = i;
        }
    }
    return result;
}

const findDimensions = (searcher, opponent) => {
    const dimensions = [];
    const fullness = []
    for (let i = 0; i < winningPositions.length; i++) {
        let count = 0;
        const array = winningPositions[i];
        for (let j = 0; j < array.length; j++) {
            let pos = array[j];
            if (opponent[pos] !== -1) {
                count = 0;
                break;
            }
            if (searcher[pos] !== -1) {
                count += 1;
            }
        }
        if (count > 0) {
            dimensions.push(winningPositions[i]);
            fullness.push(count);
        }
    }
    return { dimensions: dimensions, fullness: fullness };
}


const hasCriticalMove = (fullness) => {
    return fullness.indexOf(2) !== -1 ? 1 : 0;
}

const choseDimension = (fullness) => {
    const maxPossibleDimension = fullness.indexOf(2);
    if (maxPossibleDimension > -1) {
        return maxPossibleDimension;
    }
    return fullness.indexOf(1);
}

const findEmptyCells = (board, way) => {
    return way.filter((cell) => board[cell] === '');
}

const findEmpty = (board) => {
    return board.lastIndexOf('');
}

function random(array) {
    return Math.floor(Math.random() * array.length);
}

function attack(board, cpuDimension, cpuFul) {
    if (cpuDimension.length) {
        return makeStep(cpuDimension, cpuFul, board);
    } else {
        return findEmpty(board);
    }
}

function makeStep(dimension, fullness, board) {
    const maxIndex = choseDimension(fullness);
    const row = dimension[maxIndex];
    const possibleCells = findEmptyCells(board, row);
    return possibleCells[random(possibleCells)];
}

function detectPosition(playerPositions, cpuPositions, board) {
    const {dimensions: playerDim, fullness: playerFul} = findDimensions(playerPositions, cpuPositions);
    const {dimensions: cpuDimension, fullness: cpuFul} = findDimensions(cpuPositions, playerPositions);
    const response = !hasCriticalMove(playerFul) || hasCriticalMove(cpuFul);
    if (response) {
        return attack(board, cpuDimension, cpuFul);
    } else {
        return makeStep(playerDim, playerFul, board);
    }
}

export const findOptimalPosition = (board) => {
    const playerPositions = searchPlayerPositions(board, 'X');
    const cpuPositions = searchPlayerPositions(board, '0');
    if (playerPositions[4] === -1 && cpuPositions[4] === -1) {
        return 4;
    } else {
        return detectPosition(playerPositions, cpuPositions, board);
    }
}
