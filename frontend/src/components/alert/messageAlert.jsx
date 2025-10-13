import React, { memo } from 'react';
import WaitingAlert from './waitingAlert';
import Alert from './alert';
import AlertVerification from './alertVerification';

const MessageAlert = memo (({ message, setMessage }) => {

    const closeAlert = () => {
        setMessage({
            type: null,
            content: null,
        })
    }

    if (message.type === 'waiting') {
        return <WaitingAlert message={message.content}/>;
    } else if (message.type === 'error') {
        return <Alert message={message.content} onClose={closeAlert} />;
    } else if (message.type === 'verification') {
        return <AlertVerification message={message.content} onClose={closeAlert} />;
    }
    return null;
});

export default MessageAlert;
