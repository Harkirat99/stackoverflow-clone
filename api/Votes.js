const Votes = require('../models/Votes')
const Analytics = require('../models/Analytics')

async function createVote(body) {
    try {
        let feed = await Votes.find({ feed_id: body.feed_id })
        if (feed.length > 0) {
            let response = await Votes.updateOne(
                { feed_id: body.feed_id },
                { $push: { votes: { vote: body.vote } } }
            )
            console.log(response + "added sucessfully")

            let upVotes = await Votes.find({ feed_id: body.feed_id },
                { vote: 'up' }
            )
            let downVotes = await Votes.find({ feed_id: body.feed_id  },
                { vote: 'down' }
            )
            let postiveVote = upVotes.length
            let negativeVote = downVotes.length
            await Analytics.updateOne(
                { feed_id: body.feed_id },
                { vote_count_up: postiveVote, vote_count_down: negativeVote }
            );
            console.log('Updted vote count sucessfully')
        }
        if (feed.length == 0) {
            let entity = await Votes.create({
                feed_id: body.feed_id,
                votes: [{ vote: body.vote }]
            })
            console.log(entity, "Created new Vote Sucessfully")
            await entity.save()
        }

        // await response.save()
        return console.log("added Sucessfully")
    } catch (error) {
        console.log(error)
    }
}


async function getVote() {
    try {
        let data = await Votes.find();

        // let upVotes = await Votes.find({ feed_id: "6315c7dcad383f44391f8cd7" },
        //     { vote: 'up' }
        // )
        // let downVotes = await Votes.find({ feed_id: "6315c7dcad383f44391f8cd7" },
        //     { vote: 'up' }
        // )
        // let postiveVote = upVotes.length
        // let negativeVote = downVotes.length

        // console.log(postiveVote + negativeVote)
        if (!data) {
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