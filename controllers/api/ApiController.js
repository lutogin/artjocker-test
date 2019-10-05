const mongoose      = require('mongoose'); // С Mongo тоже столкнулся первый раз, не судите строго :)
const User          = require('../../models/User');
const csv           = require('fast-csv'); // С CSV работал первый раз, решил использовать этот модуль.
const { Parser }    = require('json2csv');

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
    static async downloadCSV(req, res) {
        let users = [];

        req.on('data', data => {
            csv.parseString(data, {
                headers: true,
                ignoreEmpty: true
            })
                .on("data", data => {
                    data['_id'] = new mongoose.Types.ObjectId();
                    users.push(data);
                })
                .on("end", () => {
                    // Если пользователь с UserName уже существует - обновим его поля, иначе создаем нового.
                    users.forEach((user) => {
                        User.updateOne(
                            {UserName: user.UserName},
                            {FirstName: user.FirstName, LastName: user.LastName, Age: user.Age, created: new Date()},
                            {upsert: true},
                            (err, user) => {
                                if (err) res.status(500).send({msg: `Ошибка! ${err.message}`});
                            }
                        );
                    });

                    res.status(200).send({msg: `${users.length} authors have been successfully uploaded.`});

                    // Начальный вариант, тупо постоянно добавляем пользователей, с дубликатами.
                    // User.insertMany(users, (err, user) => {
                    //     if (err) res.status(500).send({msg: `Ошибка! ${err.message}`});
                    // });
                });
        });
    }

    /**
     * Возвращает CSV всех пользователей с БД.
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

                const parser = new Parser({ fields, quote: '' });
                const csv = parser.parse(users);

                res.set('Content-Disposition', 'attachment;filename=users.csv');
                res.set('Content-Type', 'application/octet-stream');
                res.status(200).send(csv);
            })
            .catch(err => console.error(err.message));
    }

    /**
     * Возвращает JSON обьект всех пользователей в БД.
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getJSON(req, res) {
        User.find({}, {_id: 0, __v: 0, created: 0})
            .then(users => JSON.stringify(res.send(users)))
            .catch(err => console.error(err.message));
    }
};

module.exports = ApiController;
