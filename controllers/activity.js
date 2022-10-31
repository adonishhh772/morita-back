Activity = require('../models/activity');
var validateJson = require('../helpers/validateJson');

// Handle create contact actions
exports.new = function (req, res) {
    var activity = new Activity();
    var data = validateJson.validateJson(req.body);
    activity.client_id = data.client_id;
    activity.title = data.title;
    activity.description = data.description;
    activity.type = data.type;
    activity.name = data.name;
// save the contact and check for errors
    activity.save(function (err) {
        if (err)
            return res.json({message:err});

        res.json({
            message: 'Activity Recorded!',
            data: activity
        });

    });
};

exports.index = function (req, res) {
    Activity.get(function (err, activity) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Activity retrieved successfully",
            data: activity
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Activity.find({client_id: req.params.id}, function (err, activity) {
        if (err)
            return res.send(err);

        res.json({
            message: 'Activity for user is loading..',
            data: activity
        });
    });
};


exports.delete = async function (req, res) {
    await Activity.remove({
        _id: req.params.id
    }, function (err, activity) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'Activity deleted Successfully'
        });
    });
};
