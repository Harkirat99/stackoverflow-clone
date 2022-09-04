const Feeds = require('../models/Feeds')


async function createFeed(body) {
    try {
        let data = await Feeds.create(body);
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

async function getFeed() {
    try {
        let data = await Feeds.find().populate({
            path : 'analytics',
            populate:[
                {path:'vote_id'},
                {path:'comment_id'}
            ]    
        });
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
    createFeed,
    getFeed
}