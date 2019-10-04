const csv = require('fast-csv');

/**
 * API контроллер.
 */
class ApiController {
    static async download(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let file = req.files.file;
        let authors = [];

        csv
            .fromString(file.data.toString(), {
                headers: true,
                ignoreEmpty: true
            })
            .on("data", function(data){
                data['_id'] = new mongoose.Types.ObjectId();

                authors.push(data);
            })
            .on("end", function(){
                Author.create(authors, function(err, documents) {
                    if (err) throw err;
                });

                res.send(authors.length + ' authors have been successfully uploaded.');
            });
    }
};

module.exports = ApiController;
