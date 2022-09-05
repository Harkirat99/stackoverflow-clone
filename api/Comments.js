const { count } = require('../models/Comments')
const Comments = require('../models/Comments')
const Analytics = require('../models/Analytics')
const analyticsApi = require('../api/Analytics')
async function createComment(body) {
    try {
        let feed = await Comments.find({ feed_id: body.feed_id })
        if (feed.length > 0) {
             await Comments.updateOne(
                { feed_id: body.feed_id },
                { $push: { comments: { comment: body.comment } } }
            )
            console.log("added sucessfully")

       let records = await Comments.find({feed_id:body.feed_id});
        let countRcords = records[0].comments.length

        await Analytics.updateOne(
            {feed_id:body.feed_id},
            {comment_count:countRcords}
            
        );
        console.log("Updated Sucessfully")
            
        }
        if (feed.length == 0) {
            let entity = await Comments.create({
                feed_id: body.feed_id,
                comments: [{ comment: body.comment }]     
            })
            await entity.save()

            console.log(entity, "Created new comment Sucessfully")
        }

       
        return ('Comment has been Puushed to array')
    } catch (error) {
        console.log(error)
    }

}


async function getComment() {
    try {
        let data = await Comments.find();
       
        if (!data) {
            console.log('Some Error Occured')
        } else {
            return data
        }
    } catch (error) {
        console.log(error)
    }

}

// async function countComment(){
//     try{
//    let count = await Comments.comments.count();
//    console.log(count)
//     }catch(err){
//         console.log(err)
//     }
// }

module.exports = {
    createComment,
    getComment,
    // countComment
}