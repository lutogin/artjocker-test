const mongoose = require('mongoose'); // Первый раз использую Mongo+Mongoose, не судите строго.

module.exports = () => {
  mongoose.connect('mongodb://localhost/csv_user_test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log('Mongo DB has started.'))
    .catch((err) => console.error(err.message));
};
