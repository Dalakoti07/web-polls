/**
 * https://stackoverflow.com/a/12237273/10386258
 */

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const usersRoute = require('./routes')
const socketServer = require('./polls/socket')
const pollsRoute = require('./polls')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'));
app.use(cors())
app.use('/users', usersRoute)
app.use('/polls', pollsRoute)

app.get('/', (req, res) => {
    res.send('This is polling app')
});

const server = require('http').createServer(app);
const ss = new socketServer().getInstance();
ss.startWebSocket(server)

server.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})

