const dao = require('./dao');

class SocketServer {

    startWebSocket(server) {
        this.io = require('socket.io')(server, {
            cors: {
                origin: '*',
            }
        });

        this.io.on("connection", (socket) => {
            // client should send questionId which it want to connect to
            console.log("A client is connected")
            this.sendAQuestionListener(socket)
            socket.on("disconnect", (reason) => {
                console.log("User is disconnected", reason)
            })
        })
    }

    /*
        Channel would be same as question id
     */
    sendAQuestionListener(socket) {
        // send question details to user, including current votes status
        socket.on("fetchQuestion", (questionId) => {
            // send question details to socket
            const fetchData = async ()=>{
                try{
                    let questionDetails = await dao.getPollResultsForId(questionId)
                    socket.emit("questions",
                        questionDetails
                    )
                }catch (e) {
                    socket.emit("questions", {
                        "error": e
                    })
                }
            }
            fetchData()
        })
    }

}

module.exports = new SocketServer()

