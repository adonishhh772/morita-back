ProductImage = require('../models/pImage');
let path = require('path');
multer = require('multer');
var validateJson = require('../helpers/validateJson');
const DIR = path.join(__basedir, 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        cb(null, fileName)
    }
});


var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// Handle create contact actions
exports.new = function (req, res) {
    var image = new ProductImage();
    var data = validateJson.validateJson(req.body);
    image.product_id = data.product_id;
    image.name = data.name;
    // save the contact and check for errors
    image.save(function (err) {
        if (err)
            return res.json({message:err});

        upload.single(image.name);
        res.json({
            message: 'Image Uploaded!',
            data: image
        });

    });
};

exports.index = function (req, res) {
    ProductImage.get(function (err, image) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Images retrieved successfully",
            data: image
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    ProductImage.find({product_id: req.params.id}, function (err, image) {
        if (err)
            return res.send(err);

        res.json({
            message: 'Image for product is loading..',
            data: image
        });
    });
};


exports.delete = async function (req, res) {
    await ProductImage.remove({
        _id: req.params.id
    }, function (err, image) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'Image deleted Successfully'
        });
    });
};
