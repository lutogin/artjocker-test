const router = require('express').Router();
const ApiController = require('../../controllers/api/ApiController');


router.get('/', ApiController.download);

module.exports = router;
