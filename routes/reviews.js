let express = require('express');
let router = express.Router();
let reviewController = require('../controllers/reviews');
/* GET users listing. */

router.route('/')
    .get(reviewController.index)
    .post(reviewController.new);
router.route('/:id')
    .get(verifyToken.verifyToken,reviewController.view)

module.exports = router;
