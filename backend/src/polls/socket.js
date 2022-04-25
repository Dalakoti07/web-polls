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

    async joinRoomWithName(socket, roomName){
        // join room whose name is questionId
        await socket.join(roomName)
    }

    async broadCastUpdateDataToRoom(roomName, eventName, data){
        await this.io.to(roomName).emit(eventName, data);
    }

    /*
        Channel would be same as question id
     */
    sendAQuestionListener(socket) {
        console.log("sending question to socket", socket.id)
        // send question details to user, including current votes status
        socket.on("fetchQuestion", async (questionId) => {
            // this.joinRoomWithName(socket, questionId)
            await this.joinRoomWithName(socket, questionId)
            await this.broadCastHelloToRoom(questionId)
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

    broadcastVotingResults(questionId){
        // notify all users about it
        const asyncCall = async ()=>{
            let questionDetails = await dao.getPollResultsForId(questionId)
            await this.broadCastUpdateDataToRoom(questionId, "questions", questionDetails)
        }
        asyncCall()
    }

    async broadCastHelloToRoom(roomName){
        console.log("rooms", this.io.sockets.adapter.rooms)
        await this.io.to(roomName).emit("hello");
    }

}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new SocketServer();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

module.exports = Singleton

