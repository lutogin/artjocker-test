const path = require('path');

/**
 * Public контроллер.
 */
class ApiController {

    /**
     * Контроллер индексной страницы.
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async index(req, res) {
        res.sendFile(path.join(__dirname, '../../views/public/index.html'));
    }
};

module.exports = ApiController;
