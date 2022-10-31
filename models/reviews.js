var mongoose = require('mongoose');
// Setup schema
var reviewSchema = mongoose.Schema({
    client_id: String,
    client_name: String,
    title: String,
    description: String,
    stars: Number,
    created_date:{
        type:Date,
        default: Date.now,
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var Reviews = module.exports = mongoose.model('review', reviewSchema);
module.exports.get = function (callback, limit) {
    Reviews.find(callback).limit(limit);
}