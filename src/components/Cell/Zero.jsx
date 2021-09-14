import React from 'react';
import zero from '../../images/zero2.svg';
import style from './Cell.module.css';

const Zero = () => {
    return (
        <img src={zero} alt="0" className={style.pic__style}/>
    );
};

export default Zero;
