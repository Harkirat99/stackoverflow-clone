var mongoose = require('mongoose');
var VotesSchema = new mongoose.Schema({
    feed_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feeds",
    },
    // feed_type: {
    //     type: String,
    //     enum: ['up', 'down'],
    // }
    votes:[{
        vote:String,
        enum: ['up', 'down'],
       }]
});
const Votes = mongoose.model('Votes', VotesSchema);
module.exports = Votes;