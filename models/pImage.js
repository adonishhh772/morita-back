// Setup schema
var productImageSchema = mongoose.Schema({
    product_id: String,
    name: String,
    created_date:{
        type:Date,
        default: Date.now,
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var ProductImage = module.exports = mongoose.model('product_images', productImageSchema);
module.exports.get = function (callback, limit) {
    ProductImage.find(callback).limit(limit);
}