const UserModel = require('./schema/user')
const QuestionModel = require('./schema/Question')
const mongoose = require('mongoose');

class Dao {
    async foundUserWithName(name) {
        let result = await UserModel.findOne({
            name: name
        }).exec()
        return result != null
    }

    // todo why this func is not working?
    async foundUserWithId(id) {
        let result = await UserModel.findById(id).exec()
        console.log("result: 14, ", result)
        return result != null
    }

    async createUser(name) {
        let user = new UserModel({
            name: name
        })
        return await user.save()
    }

    async createQuestion({question, by, options}) {
        // todo make a check that same person does post same question again
        let questionModel = new QuestionModel({
            pollQuestion: question,
            postedBy: by,
            options: options
        })
        return await questionModel.save()
    }

    async findQuestionWithId(questionId) {
        return await QuestionModel.findById(questionId).lean().exec()
    }

    //todo make sure a person cannot vote more than 3 times
    async castAVoteToPoll({questionId, option}, ip) {
        let votesByIp = await this.votesOnQuestionByIp(ip, questionId)
        if(votesByIp.length>0){
            if(votesByIp[0].count >=3)
                throw "You have already voted 3 times"
        }

        // validate the questionId
        let foundQuestion = await this.findQuestionWithId(questionId)
        if (foundQuestion == null) {
            throw "question id is wrong"
        }
        let result = await QuestionModel.findByIdAndUpdate(questionId, {
            votes: foundQuestion.votes.concat(
                {
                    option: option,
                    voted_by: ip
                }
            ),
        }, {
            new: true,
            select:{
                pollQuestion: 1,
                options: 1,
                postedBy: 1,
            }
        }).exec()
        return result
    }

    async getPollResultsForId(questionId){
        let foundQuestion = await this.findQuestionWithId(questionId)
        if (foundQuestion == null) {
            throw "question id is wrong"
        }
        let pollDetails = {}
        let resultDict = {}
        foundQuestion.votes.forEach((v)=>{
            if(resultDict[v.option] === undefined){
                resultDict[v.option] = 1;
            }else{
                resultDict[v.option]++;
            }
        })
        let totalVotes = foundQuestion.votes.length
        pollDetails.totals = totalVotes
        Object.entries(resultDict).forEach(([k,v]) => {
            // console.log("votes ", k, "count", v)
            resultDict[k] = (v*100)/totalVotes;
            pollDetails[k] = {
                "votes": v,
                "percentage": resultDict[k]
            }
        })
        delete foundQuestion.votes
        delete foundQuestion.__v
        foundQuestion.result = pollDetails
        return foundQuestion
    }

    async getAllQuestion(){
        let allQuestions = await QuestionModel.find({}, {
            pollQuestion: 1,
            options: 1,
            postedBy: 1,
        })
        return allQuestions
    }

    /**
     * got it from https://stackoverflow.com/q/62972482/10386258
     */
    async votesOnQuestionByIp(ipAddress, questionId){
        let votesOnQuestion = await QuestionModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(questionId) } },
            { $unwind: "$votes" },
            {
                $group: {
                    _id: "$votes.voted_by",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    actionName: "$_id",
                    count: 1
                }
            },{
                $match:{
                    actionName: ipAddress
                }
            }
        ])
        console.log("votes, ", votesOnQuestion)
        return votesOnQuestion
    }

}

module.exports = new Dao()