import React, { useState } from 'react';
import MessageAlert from './messageAlert';

const AlertHandler = () => {
    const [message, setMessage] = useState({
        type: null,
        content: null,
    });
    const showAlert = ({ type = null, content = null }) => {
        setMessage({
            type,
            content,
        });
    };

    const alertComponent = (
        <MessageAlert message={message} setMessage={setMessage} />
    );

    return [
        alertComponent,
        showAlert
    ];
};

export default AlertHandler;
