const UserModel = require('./schema/user')
const QuestionModel = require('./schema/Question')

class Dao{
    async foundUserWithName(name){
        let result = await UserModel.findOne({
            name: name
        }).exec()
        return result != null
    }

    // todo why this func is not working?
    async foundUserWithId(id){
        let result = await UserModel.findById(id).exec()
        console.log("result: 14, ", result)
        return result != null
    }

    async createUser(name){
        let user = new UserModel({
            name: name
        })
        return  await user.save()
    }

    async createQuestion({question, by, options}){
        // todo make a check that same person does post same question again
        let questionModel = new QuestionModel({
            pollQuestion: question,
            postedBy: by,
            options: options
        })
        return await questionModel.save()
    }

    async findAllQuestion(){
        // and populate user details

    }

    //todo later make sure a person cannot vote more than one time
    async castAVoteToPoll({questionId, option}, ip){
        // validate the questionId

    }

}

module.exports = new Dao()