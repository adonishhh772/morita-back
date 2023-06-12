var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
    user_id: String,
    user_name: String,
    message: String,
    status: String,
    isAdmin: Boolean, 
    sent_date: {
        type: Date,
        default: Date.now
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var Messaging = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
    Messaging.find(callback).limit(limit);
}