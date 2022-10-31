let express = require('express');
let router = express.Router();
let messageController = require('../controllers/messaging');
verifyToken = require('../helpers/auth');
/* GET users listing. */

router.route('/')
    .post(verifyToken.verifyToken,messageController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,messageController.view)
    .put(verifyToken.verifyToken,messageController.update)
    .delete(verifyToken.verifyToken,messageController.delete);




module.exports = router;
