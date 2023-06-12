Message = require('../models/messaging');
var validateJson = require('../helpers/validateJson');


// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, msg) {
        if (err)
            return res.json({
                status: "error",
                message: err,
            });

        res.json({
            status: "success",
            message: "Message retrieved successfully",
            data: msg
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var messaging = new Message();
    var data = validateJson.validateJson(req.body);
    messaging.user_id = data.user_id;
    messaging.user_name = data.name;
    messaging.message = data.message;
    messaging.status = data.status;
// save the contact and check for errors
messaging.save(function (err) {
        if (err)
            return res.json({message:err});
        res.json({
            message: 'Message Sent!',
            data: messaging
        });
    });
};


// Handle view contact info
exports.view = function (req, res) {
    Message.find({ user_id: req.params.id }, function (err, messaging) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Message loading..',
            data: messaging
        });
    });
};


// Handle update contact info
exports.update = function (req, res) {
    Message.findById(req.params.id, function (err, messaging) {
        if (err)
            return res.send(err);

        var data = validateJson.validateJson(req.body);
        messaging.user_id = data.id;
        messaging.message = data.message;
        messaging.status = data.status;
        messaging.modified_date = Date.now();
// save the contact and check for errors
        messaging.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Message updated',
                data: messaging
            });
        });
    });
};
// Handle delete contact
// exports.delete = async function (req, res) {
//     Message.findById(req.params.id, function (err, messaging) {
//         if (err)
//             return res.send(err);

//         messaging.status = 'deleted';
//         messaging.modified_date = Date.now();
// // save the contact and check for errors
//         messaging.save(function (err) {
//             if (err)
//                 return res.json(err);
//             res.json({
//                 message: 'Message deleted',
//                 data: messaging
//             });
//         });
//     });
// };

// Handle delete contact
exports.delete = async function (req, res) {
    await Message.remove({
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




