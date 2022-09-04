const Votes = require('../models/Votes')

async function createVote(body){
    let data = await Votes.create(body)
    if(!data){
        console.log('Some Error Occured')
    }else{
        return data
    }
}


    async function getVote() {
        try {
            let data = await Votes.find();
            if (!data) {
                // res.json('Some Error Occured')
                console.log('Some Error Occured')
            } else {
                return data
            }
        } catch (error) {   
            console.log(error)
        }
    }


module.exports = {
    createVote,
     getVote
}