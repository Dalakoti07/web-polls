import {Server} from "socket.io";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
    path: "/polls"
});

io.on("connection",(socket)=>{
    console.log("A client is connected")
    socket.on("disconnect",(reason)=>{
        console.log("User is disconnected", reason)
    })
})

