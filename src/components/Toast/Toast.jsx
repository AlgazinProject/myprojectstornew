import React from 'react';
import './Toast.scss';

const Toast = ({ message, type }) => {
    return (
        <div className={`toast ${message ? 'toast--show' : ''} toast--${type}`}>
            {message}
        </div>
    );
};

export default Toast;