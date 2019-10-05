const router = require('express').Router();
const ApiController = require('../../controllers/api/ApiController');


router.post('/download-csv/', ApiController.downloadCSV);
router.get('/get-csv/', ApiController.getCSV);
router.get('/get-json/', ApiController.getJSON);

module.exports = router;
