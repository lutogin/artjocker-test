const express       = require('express');
const mongoose      = require('mongoose'); // Первый раз использую Mongo+Mongoose, не судите строго.
const path          = require('path');
const routesApi     = require('./routes/api');
const routesPublic  = require('./routes/public');

const app = express();

/**
 * Connect to DB.
 */
mongoose.connect('mongodb://localhost/csv_user_test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Mongo DB has started.'))
    .catch(err => console.error(err.message))

/**
 * Middleware.
 */
app.use(express.static(path.join(__dirname, 'static'))); // Статика.


/**
 * Routes
 */
app.use('/', routesPublic.basePublic);
app.use('/api', routesApi.baseApi);

// Catch 404
app.use((req, res) => {
    res.status(404).end('Oops 404!');
});


// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server on http://localhost:3000'));
