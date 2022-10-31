Category = require('../models/category');
var validateJson = require('../helpers/validateJson');

// Handle create contact actions
exports.new = function (req, res) {
    var category = new Category();
    var data = validateJson.validateJson(req.body);
    category.type = data.name;
// save the contact and check for errors
    category.save(function (err) {
        if (err)
            return res.json({message:err});
        res.json({
            message: 'New Category created!',
            data: category
        });
    });
};


// Handle view contact info
exports.view = function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Client details loading..',
            data: category
        });
    });
};


// Handle update contact info
exports.update = function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err)
            return res.send(err);

        var data = validateJson.validateJson(req.body);
        category.type = data.name;
        category.modified_date = Date.now();
// save the contact and check for errors
        category.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Category Info updated',
                data: category
            });
        });
    });
};
// Handle delete contact
exports.delete = async function (req, res) {
    await Category.remove({
        _id: req.params.id
    }, function (err, status) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'Category deleted Successfully'
        });
    });
};

exports.index = function (req, res) {
    Category.get(function (err, category) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Category retrieved successfully",
            data: category
        });
    });
};



