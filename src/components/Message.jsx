import React from 'react';

const style = {
    margin: "auto",
    marginBottom: "20px",
    color: "red",
    height: "30px"
}

const Message = ({ value }) => {
    return (
        <p style={style}>{value}</p>
    );
};

export default Message;
