Review = require('../models/reviews');
var validateJson = require('../helpers/validateJson');

// Handle create contact actions
exports.new = function (req, res) {
    var review = new Review();
    var data = validateJson.validateJson(req.body);
    review.client_id = data.client_id;
    review.title = data.title;
    review.description = data.description;
    review.stars = data.stars;
    review.client_name = data.client_name;
// save the contact and check for errors
    review.save(function (err) {
        if (err)
            return res.json({message:err});

        res.json({
            message: 'Review Recorded!',
            data: review
        });

    });
};

exports.index = function (req, res) {
    Review.get(function (err, review) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Review retrieved successfully",
            data: review
        });
    });
};

exports.view = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Review loading..',
            data: review
        });
    });
};



exports.delete = async function (req, res) {
    await Review.remove({
        _id: req.params.id
    }, function (err, review) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'Review deleted Successfully'
        });
    });
};
