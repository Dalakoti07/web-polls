class SocketServer {

    startWebSocket(server) {
        this.io = require('socket.io')(server, {
            cors: {
                origin: '*',
            }
        });

        this.io.on("connection", (socket) => {
            console.log("A client is connected")
            this.sendAQuestion(socket)
            socket.on("disconnect", (reason) => {
                console.log("User is disconnected", reason)
            })
        })
    }

    sendAQuestion(socket, question, channel) {
        socket.on("fetchQuestion", (data) => {
            socket.emit("questions",
                {
                    "question": "Who is sachin?",
                    "options": [
                        "Chef",
                        "Cricketer",
                        "Athlete",
                        "Singer"
                    ]
                }
            )
        })
    }

}

module.exports = new SocketServer()

