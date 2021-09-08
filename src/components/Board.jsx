import React from 'react';
import Cell from "./Cell";

const style = {
    width: "600px",
    height: "600px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)"
}

const Board = ({ onClick, value}) => {
    return (
        <div style={style}>
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
