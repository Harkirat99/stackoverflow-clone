var mongoose = require('mongoose');
var AnalyticsSchema = new mongoose.Schema({
    feed_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feeds",
    },
    comment_count: Number,
    vote_count_up: Number,
    vote_count_down: Number,

    vote_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Votes",
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    },
    // comments: String
});
const Analytics = mongoose.model('Analytics', AnalyticsSchema);
module.exports = Analytics;