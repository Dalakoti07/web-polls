import React, {useEffect, useState} from 'react';
import './Messages.css';

/**
 * https://socket.io/get-started/chat
 */
function Messages({socket}) {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        /*const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');*/
        socket.emit("fetchQuestion")
        socket.on("questions", (data) => {
            console.log("questions", data)
            setMessages(data)
        })

        return () => {
            // socket.off('message', messageListener);
            // socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className="message-list">
            {/*messages && (*/}
            {/*    {messages.question}*/}
            {/*    {messages.options.map((elem)=> <p>{elem}</p>)}*/}
            {/*)*/}
        </div>
    );
}

export default Messages;