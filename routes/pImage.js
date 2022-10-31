let express = require('express');
let router = express.Router();
let pImageController = require('../controllers/pImage');
verifyToken = require('../helpers/auth');
/* GET users listing. */

router.route('/')
    .get(verifyToken.verifyToken,pImageController.index)
    .post(verifyToken.verifyToken,pImageController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,pImageController.view)
    .delete(verifyToken.verifyToken,pImageController.delete);




module.exports = router;