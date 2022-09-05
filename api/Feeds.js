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

async function getFeed(query) {
    try {
        const {page=1, limit=10} = query
        const count = await Feeds.count()
        let data = await Feeds.find().populate({
            path : 'analytics',
            populate:[
                {path:'vote_id'},
                {path:'comment_id'}
            ]    
        }).limit(limit).skip((page - 1)*limit).exec();
        if (!data) {
            // res.json('Some Error Occured')
            console.log('Some Error Occured')
        } else {
           return{
            data:data,
            totalPages:Math.ceil(count / limit),
            currentPage: parseInt(page)
           } 
           
           
        }
    } catch (error) {   
        console.log(error)
    }
}
module.exports = {
    createFeed,
    getFeed
}




// Geeting feeds with analytics info(only if user is loggedin)
