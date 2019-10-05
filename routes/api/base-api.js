const router = require('express').Router();
const ApiController = require('../../controllers/api/ApiController');


router.post('/download-csv/', ApiController.downloadCSV); // Загрузка CSV
router.get('/get-csv/', ApiController.getCSV); // Получение CSV.
router.get('/get-json/', ApiController.getJSON); // Получение JSON пользователей.

module.exports = router;
