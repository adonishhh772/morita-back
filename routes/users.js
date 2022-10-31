var express = require('express');
var router = express.Router();
let path = require('path');
multer = require('multer');
var contactController = require('../controllers/customers');
verifyToken = require('../helpers/auth');

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

router.route('/login').post(contactController.login);
router.route('/register').post(contactController.register);
router.route('/').get(verifyToken.verifyToken,contactController.index);
router.route('/blacklist/:id').get(verifyToken.verifyToken,contactController.blacklist);
router.route('/whitelist/:id').get(verifyToken.verifyToken,contactController.whitelist);
router.route('/:id').get(verifyToken.verifyToken,contactController.view);
router.route('/:id').put(verifyToken.verifyToken,contactController.update)
router.route('/upload').post(upload.single('avatar'),contactController.uploadFile);


module.exports = router;
