let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');
verifyToken = require('../helpers/auth');
/* GET users listing. */

router.route('/')
    .get(verifyToken.verifyToken,productController.index)
    .post(verifyToken.verifyToken,productController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,productController.view)
    .put(verifyToken.verifyToken,productController.update)
    .delete(verifyToken.verifyToken,productController.delete);




module.exports = router;
