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
        let array = winningPositions[i];
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
    return fullness.indexOf(2);
}

const findEmptyCells = (board, way) => {
    const result = [];
    for (let i = 0; i < way.length; i++) {
        if (board[way[i]] === '') {
            result.push(way[i]);
        }
    }
    return result;
}

const findEmpty = (board) => {
    return board.lastIndexOf('');
}

function random(array) {
    return Math.floor(Math.random() * array.length);
}

function attack(cpuPositions, playerPositions, board) {
    const {dimensions: cpuDimension, fullness: cpuFul} = findDimensions(cpuPositions, playerPositions);
    if (cpuDimension.length) {
        let ownMove = hasCriticalMove(cpuFul);
        if (ownMove === -1) {
            ownMove = cpuFul.indexOf(1);
        }
        const cpuRow = cpuDimension[ownMove];
        const possibleCells = findEmptyCells(board, cpuRow)
        return possibleCells[random(possibleCells)];
    } else {
        return findEmpty(board);
    }
}

function defence(playerDim, response, board) {
    const row = playerDim[response];
    const possibleCells = findEmptyCells(board, row);
    return possibleCells[random(possibleCells)];
}

function detectPosition(playerPositions, cpuPositions, board) {
    const {dimensions: playerDim, fullness: playerFul} = findDimensions(playerPositions, cpuPositions);
    const response = hasCriticalMove(playerFul);
    if (response === -1) {
        return attack(cpuPositions, playerPositions, board);
    } else {
        return defence(playerDim, response, board);
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
