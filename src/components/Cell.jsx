import React from 'react';

const style = {
    border: "2px solid red",
    fontSize: "30px",
}

const Cell = ({name, onClick, value}) => {
    return (
        <button
            style={style}
            name={name}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Cell;
