const router = require('express').Router();
const PublicController = require('../../controllers/public/PublicController');


router.get('/', PublicController.index);

module.exports = router;
