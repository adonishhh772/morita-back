Contact = require('../models/customers');
let jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var validateJson = require('../helpers/validateJSON');


// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, users) {
        if (err)
            return res.json({
                status: "error",
                message: err,
            });

        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.register = function(req,res){
   
    // check if user already exist
    // Validate if user exist in our database
    Contact.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
            return res.status(409).send({msg:'User Already Exist. Please Login'});
        }else if(err){
            return res.status(500).send({msg:'Error on the server.'});
        }else{
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                Contact.create({
                        email : req.body.email,
                        password : hashedPassword,
                        role:'users'
                    },
                    function (err, user) {
                        if (err) return res.status(500).send("There was a problem registering the user.")
                        // create a token ba
                        var token = jwt.sign({ id: user._id,email:user.email,role:user.role }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        return res.status(200).send({ auth: true, token: token });
                    });
        }
    });

    
};

exports.login = function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods', 'GET,POST");
    Contact.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(400).send({msg:'No user found.'});

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null,msg: 'No Password Found' });

        var token = jwt.sign({ id: user._id,email:user.email,role:user.role,blacklisted:user.blackList,name:user.name }, config.secret, {
            expiresIn: 6400 // expires in 24 hours
        });

        return res.status(200).send({ auth: true, token: token});
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err)
            return res.send(err);

        var data = validateJson.validateJson(req.body);
        contact.name = data.name;
        contact.email = data.email;
        contact.birthday = data.birthday;
        contact.reply_email = data.reply_email;
        contact.gender = data.gender;
        contact.phone = data.phone;
        contact.street = data.street;
        contact.disability = data.disability;
        contact.postal_code = data.postal_code;
        contact.address = data.address;
        contact.county = data.county;
        contact.description = data.description;
        contact.completed = true;
        contact.modified_date = Date.now();
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Profile Info updated',
                data: contact
            });
        });
    });
};

exports.uploadFile = function(req, res) {
    var data = validateJson.validateJson(req.body);
    Contact.findById(data.id, function (err, contact) {
        if (err)
            return res.send(err);


        contact.profile_photo = data.pic;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Profile Picture uploaded succesfully',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.blacklist = function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err)
            return res.send(err);
        contact.blackList = true;
        contact.modified_date = Date.now();
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Profile Blacklisted',
                data: contact
            });
        });
    });
};

exports.whitelist = function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err)
            return res.send(err);
        contact.blackList = false;
        contact.modified_date = Date.now();
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Profile Whitelisted',
                data: contact
            });
        });
    });
};




