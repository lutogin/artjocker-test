/**
 * API контроллер.
 */
class ApiController {
    static async index(req, res) {
        res.send('Test');
    }
};

module.exports = ApiController;
