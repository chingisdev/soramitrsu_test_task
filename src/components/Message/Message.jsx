import React from 'react';
import './Message.css';

function Message({ value }) {
    return (
        <p className={"message__style"}>{value}</p>
    );
}

export default Message;
