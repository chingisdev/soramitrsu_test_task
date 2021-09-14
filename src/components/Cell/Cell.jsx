import React from 'react';
import style from './Cell.module.css';
import Cross from "./Cross";
import Zero from "./Zero";

const Cell = ({name, onClick, value}) => {
    function renderValue(value) {
           switch (value) {
               case "X": {
                   return <Cross />;
               }
               case "0": {
                   return <Zero />;
               }
               default: {
                   return "";
               }
           }
    }

    return (
        <button
            className={style.cell__style}
            name={name}
            onClick={onClick}
        >
            {renderValue(value)}
        </button>
    );
};

export default Cell;
