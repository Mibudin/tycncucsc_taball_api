"use strict";

const Express = require("express");
const app = Express();


/**
 * Initialize records
 */
require("./controllers/tableController").initTableRecords(10);

/**
 * Express APP use: body parsing
 * Serve body part parsing
 */
app.use(Express.json());  // For parsing application/json
app.use(Express.urlencoded({extended: true}));  // For parsing application/x-www-form-urlencoded

/**
 * Express APP use: `/assets`
 * Serve static files.
 */
app.use("/assets", Express.static("assets"));

/**
 * Express APP use: `/api/v0`
 * Serve the API.
 */
app.use("/api/v0", require("./routes/api"));
app.use('/api/v0', (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 Internal Server Error: Something broke!");
});

/**
 * Express APP use: `/api-docs/v0`, `/api-docs-dark/v0`
 * Serve the Swagger document of the API
 */
require("./api/swagger").useSwagger(app);

/**
 * Express APP start server
 */
const port = process.env.PORT || 3000;
app.listen(port);
console.log("~TYCNCUCSC TABALL API~\nThe server is now started on the port: " + port);
