//
//
// class SocketServer{
//
//     constructor() {
//
//     }
//
//     startServer(server: any) {
//         const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);
//         // io.attach(server, {
//         //
//         // })
//
//         io.on("connection",(socket)=>{
//             console.log("A client is connected")
//             socket.on("disconnect",(reason)=>{
//                 console.log("User is disconnected", reason)
//             })
//         })
//     }
//
// }
//
// module.exports = new SocketServer()
//
