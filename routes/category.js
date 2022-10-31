let express = require('express');
let router = express.Router();
let customerController = require('../controllers/category');
verifyToken = require('../helpers/auth');
/* GET users listing. */

router.route('/')
    .get(verifyToken.verifyToken,customerController.index)
    .post(verifyToken.verifyToken,customerController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,customerController.view)
    .put(verifyToken.verifyToken,customerController.update)
    .delete(verifyToken.verifyToken,customerController.delete);




module.exports = router;
