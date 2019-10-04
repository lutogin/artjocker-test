const app           = require('express')();
const routesApi     = require('./routes/api');
const routesPublic  = require('./routes/public');
const fileUpload    = require('express-fileupload');

/**
 * Middleware
 */
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// Каталог для статичный файлов
// app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */
app.use('/', routesPublic);
app.use('/api', routesApi);

// Catch 404
app.use((req, res) => {
    res.status(404).end('Oops 404!');
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server on 3000 port'));
