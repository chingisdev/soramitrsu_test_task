import React from 'react';
import style from './Cell.module.css';

const Cell = ({name, onClick, value}) => {
    return (
        <button
            className={style.cell__style}
            name={name}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Cell;
