const path = require('path');
/**
 * Public контроллер.
 */
class ApiController {
    static async index(req, res) {
        res.sendFile(path.join(__dirname, '../../views/public/index.html'));
    }
};

module.exports = ApiController;
