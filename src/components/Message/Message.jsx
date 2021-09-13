import React from 'react';
import style from './Message.module.css';

const Message = ({ value }) => {
    return (
        <h2 className={style.message__style}>{value}</h2>
    );
};

export default Message;
