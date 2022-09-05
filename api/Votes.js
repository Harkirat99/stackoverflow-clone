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

            // let upVotes = await Votes.find({ feed_id: body.feed_id },
            //     { vote: 'up' }
            // )
            // let downVotes = await Votes.find({ feed_id: body.feed_id  },
            //     { vote: 'down' }
            // )
            // let vt = await Votes.find({ feed_id: body.feed_id})
            // let upvt = await Votes.find(
            //     { feed_id: body.feed_id },
            //     { votes: { vote: "up" } }
            // )
            let upvote = await Votes.find({ feed_id: body.feed_id })
            const arrUp = upvote[0].votes
            let postiveVote = arrUp.filter(function (up) {
                return up.vote == 'up'
            })
            let negativeVote = arrUp.filter(function (up) {
                return up.vote !== 'up'
            })
            const upVoteLen = postiveVote.length
            const downVoteLen = negativeVote.length

            console.log(upVoteLen)
            if (body.vote == 'up') {
                await Analytics.updateOne(
                    { feed_id: body.feed_id },
                    { vote_count_up: upVoteLen }
                );
            }
            if (body.vote == 'down') {
                await Analytics.updateOne(
                    { feed_id: body.feed_id },
                    { vote_count_down: downVoteLen }
                );
            }

            try {
                console.log('Updted vote count sucessfully')
            } catch (error) {
                console.log(error)
            }

        }
        if (feed.length == 0) {
            let entity = await Votes.create({
                feed_id: body.feed_id,
                votes: [{ vote: body.vote }]
            })
            console.log(entity, "Created new Vote Sucessfully")
            await entity.save()
        }

        return console.log("added Sucessfully")
    } catch (error) {
        console.log(error)
    }
}


async function getVote() {
    try {
        let data = await Votes.find();
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