var mongoose = require('mongoose');
// Setup schema
var activitySchema = mongoose.Schema({
    client_id: String,
    name: String,
    title: String,
    description: String,
    type: String,
    created_date:{
        type:Date,
        default: Date.now,
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var Activity = module.exports = mongoose.model('activity', activitySchema);
module.exports.get = function (callback, limit) {
    Activity.find(callback).limit(limit);
}