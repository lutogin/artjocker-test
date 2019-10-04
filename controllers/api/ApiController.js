const csv           = require('fast-csv');
const { Parser }     = require('json2csv');
const mongoose      = require('mongoose');
const User          = require('../../models/User');

/**
 * API контроллер.
 */
class ApiController {

    /**
     * Контроллер загрузки CSV
     *
     * @param req
     * @param res
     * @returns {Promise<Response>}
     */
    static async download(req, res) {
        // let body = '';
        // req.on('data', function (data) {
        //     body += data;
        //     console.log(body)
        // });

        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let file = req.files.file;
        let users = [];

        csv
            .parseString(file.data.toString(), {
                headers: true,
                ignoreEmpty: true
            })
            .on("data", function(data) {
                data['_id'] = new mongoose.Types.ObjectId();
                users.push(data);
            })
            .on("end", function() {
                // @todo: Возможно тот стоит сделать .update в цикле по UserName
                User.create(users, function(err, documents) {
                    if (err) throw err;
                });
                res.status(200).send(`${users.length} authors have been successfully uploaded.`);
            });
    }

    /**
     * Возвращает CSV всех пользователей с БД
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getCSV(req, res) {
        User.find({}, {_id: 0, created: 0, __v: 0})
            .then(users => {
                // Заголовки CSV. Т.к. в БД добавил поля _id и created заполним поля вручную.
                const fields = [
                    'UserName',
                    'FirstName',
                    'LastName',
                    'Age',
                ];

                const parser = new Parser({ fields });
                const csv = parser.parse(users);

                res.set("Content-Disposition", "attachment;filename=users.csv");
                res.set("Content-Type", "application/octet-stream");
                res.status(200).send(csv);
            })
            .catch(e => console.error(e.message()))
    }

    /**
     * Возвращает JSON обьект всем пользователей в БД.
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getJSON(req, res) {
        User.find({}, {_id: 0, created: 0, __v: 0})
            .then(users => {
                res.status(200).send(JSON.stringify(users));
            })
            .catch(e => console.error(e.message()))
    }
};

module.exports = ApiController;
