const Analytics = require('../models/Analytics')

async function getAnalytics(){
 let data = await Analytics.find().populate('vote_id').populate('comment_id')
 if(!data){
    console.log('Some Error Occured')
 }else{
    return data;
 }
}

async function createAnalytics(body){
    let data = await Analytics.create(body)
    if(!data){
        console.log('Some Error Occured')
    }else{
        return data
    }
   }
   

module.exports = {
    getAnalytics,
    createAnalytics
}