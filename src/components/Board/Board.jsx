import React from 'react';
import Cell from "../Cell/Cell";
import style from './Board.module.css';


const Board = ({ onClick, value}) => {
    return (
        <div className={style.board__style}>
            {[ ...Array(9)].map((ignored, index) => (
                <Cell
                    key={index}
                    name={index}
                    onClick={() => onClick(index)}
                    value={value[index]} />)
                )
            }
        </div>
    );
};

export default Board;
