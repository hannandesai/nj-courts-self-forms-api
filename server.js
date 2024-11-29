const express = require('express');
const routes = require("./routes/index");
const config = require("./config.json");
const middlewares = require("./middlewares/index");

// create express app
const app = express();

// setup middlewares
middlewares(app);

// setup routes
routes(app);

// start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})