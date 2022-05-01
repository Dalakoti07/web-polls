const express = require('express');

const router = express.Router();
const UserModel = require('./schema/user')

// this is mongo database, we wont be using it though
const database = require('./db');
const dao = require('./dao');
const Utils = require('./utils')
const mySocket = require("./socket");

router.post('/user', async (req, res)=>{
    try{
        let found = await dao.foundUserWithName(req.body.name)
        console.log("user-found: ", found)
        if(found){
            throw "Name already Exist "
        }
        const user = dao.createUser()
        res.send(
            user
        )
    }catch (exception){
        res.send({
            error: exception
        })
    }
})

// create a poll, give question and options in body
router.post('/create', async(req, res)=>{
    try{
        let isValid = Utils.validateDataForQuestions(req.body)
        console.log("data-valid: ", isValid)
        // find if user Name is correct
        let userExists = await dao.foundUserWithId(req.body.by)
        if(!userExists){
            throw "User does not exist"
        }
        const question = await dao.createQuestion(req.body);
        res.send(question)
    }catch (exception){
        res.send({
            error: exception
        })
    }
})

router.post('/vote',async(req, res)=>{
    try {
        Utils.validateDataForVoting(req.body)
        console.log("ip address is ...", req.ip)
        let result = await dao.castAVoteToPoll(req.body, req.ip)
        // notify all users about it
        let mySocket = require('./socket')
        new mySocket().getInstance().broadcastVotingResults(req.body.questionId)
        res.send(result)
    }catch (exception){
        res.send({
            error: exception
        })
    }
})

router.get('/vote/result', async (req, res)=>{
    try {
        let result = await dao.getPollResultsForId(req.query.id);
        res.send(result)
    }catch (exception){
        res.send({
            error: exception
        })
    }
})

router.patch('/poll',(req, res)=>{


    res.send('poll updated')
})

router.get('/all',async(req, res)=>{
    try{
        if(req.query.hash !== process.env.secret_hash)
            throw "invalid secret token"
        let result = await dao.getAllQuestion()
        res.send(result)
    }catch (e) {
        res.send({
            error: e
        })
    }
})

router.get('/play/sockets',async (req, res)=>{
    let mySocket = require('./socket')
    await new mySocket().getInstance().broadCastHelloToRoom(req.query.room)
    res.send("200")
})


module.exports = router;