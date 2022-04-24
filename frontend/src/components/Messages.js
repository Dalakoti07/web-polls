import React, {useEffect, useState} from 'react';

/**
 * https://socket.io/get-started/chat
 */
// todo rename this
function Messages({socket}) {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
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