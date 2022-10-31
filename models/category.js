var mongoose = require('mongoose');
// Setup schema
var categorySchema = mongoose.Schema({
    type: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var Category = module.exports = mongoose.model('product_category', categorySchema);
module.exports.get = function (callback, limit) {
    Category.find(callback).limit(limit);
}