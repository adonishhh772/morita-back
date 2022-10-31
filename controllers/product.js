Product= require('../models/product');
var validateJson = require('../helpers/validateJSON');

// Handle create contact actions
exports.new = function (req, res) {
    var product = new Product();
    var data = validateJson.validateJson(req.body);
    product.category = data.category;
    product.type = data.type;
    product.name = data.name;
    product.color = data.color;
    product.quantity = data.quantity;
    product.brand = data.brand;
    product.availability = data.availability;
    product.price = data.price;
    product.discount = data.discount;
    product.voucher = data.voucher;
    product.height = data.height;
    product.width = data.width;
    product.depth = data.depth;
    product.description = data.description;
    // save the product and check for errors
    product.save(function (err) {
        if (err)
            return res.json({message:err});
        res.json({
            message: 'New Product created!',
            data: product
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Product loading..',
            data: product
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            return res.send(err);

        var data = validateJson.validateJson(req.body);
        product.category = data.category;
        product.type = data.type;
        product.name = data.name;
        product.color = data.color;
        product.quantity = data.quantity;
        product.brand = data.brand;
        product.availability = data.availability;
        product.price = data.price;
        product.discount = data.discount;
        product.voucher = data.voucher;
        product.height = data.height;
        product.width = data.width;
        product.depth = data.depth;
        product.description = data.description;
        product.modified_date = Date.now();
// save the contact and check for errors
        application.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Product Info updated',
                data: application
            });
        });
    });
};

// Handle delete contact
exports.delete = async function (req, res) {
    await Product.remove({
        _id: req.params.id
    }, function (err, product) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'Product deleted Successfully'
        });
    });
};


exports.index = function (req, res) {
    Product.get(function (err, product) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Product retrieved successfully",
            data: product
        });
    });
};

