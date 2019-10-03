const express   = require('express');
const routesApi = require('./routes/api');

const app = express();

/**
 * Middleware
 */

// Каталог для статичный файлов
// app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */
app.use('/api', routesApi);

// Catch 404
app.use((req, res) => {
    res.status(404).end('Oops 404!');
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server on 3000 port'));
