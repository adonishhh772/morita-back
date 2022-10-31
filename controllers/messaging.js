Message = require('../models/messaging');
var validateJson = require('../helpers/validateJson');

// Handle create contact actions
exports.new = function (req, res) {
    var message = new Message();
    var data = validateJson.validateJson(req.body);
    message.user_id = data.id;
    message.message = data.message;
    message.status = data.status;
// save the contact and check for errors
    message.save(function (err) {
        if (err)
            return res.json({message:err});
        res.json({
            message: 'Message Sent!',
            data: message
        });
    });
};


// Handle view contact info
exports.view = function (req, res) {
    Message.findOne({ user_id: req.body.id }, function (err, messaging) {
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
exports.delete = async function (req, res) {
    Message.findById(req.params.id, function (err, messaging) {
        if (err)
            return res.send(err);

        messaging.status = 'deleted';
        messaging.modified_date = Date.now();
// save the contact and check for errors
        messaging.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Message deleted',
                data: messaging
            });
        });
    });
};




