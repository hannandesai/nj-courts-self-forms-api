const bodyParser = require('body-parser');
const cors = require("./cors");
const config = require("../config.json");
const compression = require('compression');
const helmet = require('helmet');

module.exports = function (app) {
    // Prevent opening page in frame or iframe to protect from clickjacking
    if (config.server.security.enableXframe)
        app.use(helmet.frameguard());

    // Remove X-Powered-By
    if (config.server.security.enableHidePoweredBy)
        app.use(helmet.hidePoweredBy());

    // Prevents browser from caching and storing page
    // if (config.server.security.enableNoCaching)
    //     app.use(helmet.);

    // Allow loading resources only from white-listed domains
    if (config.server.security.enableCSP)
        app.use(helmet.contentSecurityPolicy());

    // Allow communication only on HTTPS
    if (config.server.security.enableHSTS)
        app.use(helmet.hsts());

    // Enable XSS filter in IE (On by default)
    if (config.server.security.enableXssFilter)
        app.use(helmet.xssFilter());

    // Enable XSS filter in IE (On by default)
    if (config.server.security.enableReferrerPolicy)
        app.use(helmet.referrerPolicy({ policy: "no-referrer", }));

    // Forces browser to only use the Content-Type set in the response header
    // instead of sniffing or guessing it
    if (config.server.security.enableForceContentType)
        app.use(helmet.xContentTypeOptions());

    // Enable CORS
    if (config.server.security.enableCORS) {
        cors(app);
    }

    // Enable request body parsing
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: config.server.bodyParser.limit
    }));

    // Enable request body parsing in JSON format
    app.use(bodyParser.json({
        limit: config.server.bodyParser.limit
    }));

    // Decrypt req body
	require("./decrypt-payload")(app);

    // response interceptor to encrypt data before sending
	// require('./responseInterceptor')(app);

    // Enable compression
    if (config.server.enableCompression) {
        app.use(compression());
    }
}