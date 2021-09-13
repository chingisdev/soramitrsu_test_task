import React from 'react';
import style from './Reset.module.css'

const Reset = ({ onClick }) => {
    return (
        <button className={style.reset__style} onClick={onClick}>
            Restart
        </button>
    );
};

export default Reset;
