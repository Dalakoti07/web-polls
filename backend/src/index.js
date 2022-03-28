/**
 * https://stackoverflow.com/a/12237273/10386258
 */

const express = require('express');

const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello boy!')
});

const server = require('http').createServer(app);
let io = require('socket.io')(server,{
    cors: {
        origin: '*',
    }
});

io.on("connection",(socket)=>{
    console.log("A client is connected")
    socket.on("disconnect",(reason)=>{
        console.log("User is disconnected", reason)
    })
})

server.listen(3000, () => {
    console.log('Server running')
})

