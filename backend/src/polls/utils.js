class Utils{

    validateDataForQuestions(dto){
        /*
            question: string
            options: array of string
            by: string,
        */
        if(!dto.question)
            throw "Question cannot be empty"
        if(typeof dto.options === 'object' && dto.options.length <=4 && dto.options.length>0){
            // nothing
        }else{
            throw "Options should be at least 1 and at most 4"
        }
        if(!dto.by){
            throw "this user does not exist"
        }

        return true
    }

    validateDataForVoting(dto){
        if(!dto.questionId)
            throw  "Invalid question Id"
        if(typeof dto.option === "number" && dto.option>0 && dto.option<=4){
            // valid
        }else{
            throw "Invalid option picked"
        }

        return true
    }

}

module.exports = new Utils()