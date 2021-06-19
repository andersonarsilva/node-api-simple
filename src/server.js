const   express = require('express'),
        compression = require('compression'),
        expressPublicIp = require('express-public-ip'),
        path = require('path'),
        bodyParser = require('body-parser'),
        routes = require('./routes'),
        apiTimeout = (30 * 1000);

const app = express();

app.enable('trust proxy');
app.use(expressPublicIp());
app.use(compression());
app.use(express.json());
app.use(function (req, res, next) {
	res.cancelRequest = false;
	req.setTimeout(apiTimeout, () => {
		res.cancelRequest = true;
		next(JSON.stringify({ status: 'error', code: '00', data: 'request timeout' }));
		return false;
	});
	res.setTimeout(apiTimeout, () => {
		res.cancelRequest = true;
		next(JSON.stringify({ status: 'error', code: '00', data: 'request timeout' }));
		return false;
	});
	next();
})
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(routes);

app.use((req, res, next) => {
	res.status(401).send({ message: 'Not found.' });
})

app.listen(3333, () => {
    console.log(`Server started on http://localhost:3333`);
});

module.exports = app;