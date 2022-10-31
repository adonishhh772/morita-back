var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    category: String,
    type: String,
    name: String,
    color: String,
    quantity: Number,
    brand: String,
    availability: Boolean,
    price: Number,
    discount: String,
    voucher: String,
    height: String,
    width: String,
    depth: String,
    description: String,
    created_date:{
        type:Date,
        default: Date.now,
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var ProductModel = module.exports = mongoose.model('products', productSchema);
module.exports.get = function (callback, limit) {
    ProductModel.find(callback).limit(limit);
}