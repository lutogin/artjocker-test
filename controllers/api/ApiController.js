const csv           = require('fast-csv'); // С CSV работал первый раз, решил заюзать этот модуль.
const { Parser }    = require('json2csv');
const mongoose      = require('mongoose'); // С Mongo тоже сталкнулся первый раз, не судите строго :)
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
    static async downloadCSV(req, res) {

        // if (!req.files)
        //     return res.status(400).send('No files were uploaded.');

        // let file = req.files.file;
        let users = [];
        let body = '';

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
                    // @todo: Возможно тот стоит сделать .update в цикле по UserName
                    users.forEach((user) => {
                        User.updateOne(
                            {UserName: user.UserName},
                            {FirstName: user.FirstName, LastName: user.LastName, Age: user.Age},
                            {upsert: true},
                            (err, user) => {
                                if (err) throw err
                            }
                        );
                    });

                    // for (let i = 0; i < users.length; i++) {
                    //     User.updateOne(
                    //         {UserName: users[i].UserName},
                    //         {'FirstName': users[i].FirstName, 'LastName': users[i].LastName, 'Age': users[i].Age},
                    //         {upsert: true},
                    //         (err, user) => {
                    //             if (err) throw err
                    //         }
                    //     );
                    // }

                    // User.insertMany(users, (err, user) => {
                    //     if (err) throw err;
                    // });
                    res.status(200).send({msg: `${users.length} authors have been successfully uploaded.`});
                });
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

                const parser = new Parser({ fields, quote: "" });
                const csv = parser.parse(users);

                res.set("Content-Disposition", "attachment;filename=users.csv");
                res.set("Content-Type", "application/octet-stream");
                res.status(200).send(csv);
            })
            .catch(err => console.error(err.message));
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
            .then(users => JSON.stringify(res.send(users)))
            .catch(err => console.error(err.message));
    }
};

module.exports = ApiController;
