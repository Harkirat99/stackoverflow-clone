const Comments = require('../models/Comments')

async function createComment(body){
    let data = await Comments.find({feed_id:body.feed_id})
    let {cmnt} = body.comments
    if(data){
        data.comments.push({
            comment: cmnt
        })   
        return('Comment has been Puushed to array')
    }else if(!data){
          await Comments.create(body)    
          return "New Comment has been created"
    }

    // let data = await Comments.create(body)
    // if(!data){
    //     console.log('Some Error Occured')
    // }else{
    //     return data
    // }
}


    async function getComment() {
        try {
            let data = await Comments.find();
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
    createComment,
    getComment
}