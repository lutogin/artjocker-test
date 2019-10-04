const router = require('express').Router();
const ApiController = require('../../controllers/api/ApiController');


router.get('/', ApiController.index);

module.exports = router;
