"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    path: "/polls"
});
io.on("connection", (socket) => {
    console.log("A client is connected");
    socket.on("disconnect", (reason) => {
        console.log("User is disconnected", reason);
    });
});
