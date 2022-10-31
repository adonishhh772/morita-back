let express = require('express');
let router = express.Router();
let activityController = require('../controllers/activity');
verifyToken = require('../helpers/auth');
/* GET users listing. */

router.route('/')
    .get(verifyToken.verifyToken,activityController.index)
    .post(verifyToken.verifyToken,activityController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,activityController.view)
    .delete(verifyToken.verifyToken,activityController.delete);


module.exports = router;
