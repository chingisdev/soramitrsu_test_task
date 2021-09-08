import React from 'react';

const style = {
    width: "100px",
    height: "30px",
    margin: "auto",
    marginTop: "20px"
}

const Reset = ({ onClick }) => {
    return (
        <button style={style} onClick={onClick}>
            Reset
        </button>
    );
};

export default Reset;
