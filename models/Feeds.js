var mongoose = require('mongoose');
var FeedsSchema = new mongoose.Schema({
        analytics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics",
    },
    title: String,
    description: String,
});
const Feeds = mongoose.model('Feeds', FeedsSchema);
module.exports = Feeds;
