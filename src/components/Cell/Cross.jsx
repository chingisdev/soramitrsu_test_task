import React from 'react';
import cross from '../../images/cross4.svg';
import style from './Cell.module.css'

const Cross = () => {
    return (
        <img src={cross} alt="X" className={style.pic__style}/>
    );
};

export default Cross;
