const config = require('../config.json');

exports = module.exports = function(app) {
	app.use(function(req, res, next) {
		if (config.server.CORS.allowedOrigins.indexOf(req.headers.origin) !== -1) {
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Methods', config.server.CORS.allowedMethods);
			res.header('Access-Control-Allow-Headers', config.server.CORS.allowedHeaders);
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Expose-Headers', config.server.CORS.exposedHeaders);
			next();
		} else {
			next();
		}
	});

	app.options('*', function(req, res) {
		res.status(200).end();
	});
};