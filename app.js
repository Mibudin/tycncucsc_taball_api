"use strict";

const Express = require("express");
const app = Express();

const logger = require("./lib/logger/logger");

const CF = require("js-yaml").load(require("fs").readFileSync("./config.yaml", "utf8"));;

const ula = new (require("./lib/uList/UListAsync").UListAsync)(
    new (require("./lib/uList/UList").UList)(
        CF.mongo.local.host, CF.mongo.local.port, CF.mongo.db.name));


/**
 * Start: Lambda async IIFE
 */
(async()=>{

/**
 * Initializa the MongoDB driver.
 */
await ula.connectToDB();
// if(CF.server.cf.inDev) await ula.dropCollection(CF.mongo.db.colles.table.name)
logMsg("ULA", "CONNECT_DB", "COMPLETED");

/**
 * Initialize controllers
 */
// require("./controllers/tableController").initTableRecords(CF.server.cf.tableNum);
await require("./controllers/tableController").initTableRecordsDb(CF.server.cf.tableNum);
logMsg("TABLE_CTRLR", "INIT", "COMPLETED");

require("./controllers/viewController").initViewPages(["/"]);
logMsg("VIEW_CTRLR", "INIT", "COMPLETED");

/**
 * Express APP set
 */
app.set("port", process.env.PORT || CF.server.lan.port);
app.set("hostName", CF.server.lan.host);
app.set("views", "views");
app.set("view engine", "pug");
app.set("env", CF.server.cf.inDev ? "development" : "production");  // Not to send error message to the front end
logMsg("APP", "SET_ENV", "COMPLETED");

/**
 * Express APP use: body parsing
 * Serve body part parsing
 */
app.use(Express.json());  // For parsing application/json
app.use(Express.urlencoded({extended: true}));  // For parsing application/x-www-form-urlencoded
logMsg("APP", "USE_GEN", "COMPLETED");

/**
 * Express APP use: `/assets`
 * Serve static files.
 */
app.use("/assets", Express.static("assets"));
logMsg("APP", "USE_STATIC", "COMPLETED");

/**
 * Express APP use: `/api/v0`
 * Serve the API.
 */
app.use("/api/v0", require("./routes/api"));
logMsg("APP", "USE_API", "COMPLETED");

/**
 * Express APP use: `/api-docs/v0`, `/api-docs-dark/v0`
 * Serve the Swagger document of the API
 */
if(CF.server.cf.swagger)
{
    require("./api/swagger").useSwagger(app);
    logMsg("APP", "USE_SWAGGER", "COMPLETED");
}

/**
 * Express APP use: `/taball`
 * Serve the website.
 */
app.use("/taball", require("./routes/taball"));
logMsg("APP", "USE_TABALL", "COMPLETED");


/**
 * Express APP start server
 */
app.listen(app.get("port")/*, app.get("hostName")*/);
// console.log("~TYCNCUCSC TABALL API~\nThe server is now started on the port: " + app.get("port"));
logMsg("APP", "LISTEN", "COMPLETED][" + app.get("port"));


/**
 * End: Lambda async IIFE
 */
})();

/**
 * 
 * @param {string} obj 
 * @param {string} phs 
 * @param {string} rslt 
 */
function logMsg(obj, phs, rslt)
{
    logger.logServer({
        time: new Date().toISOString(),
        cat:  "SERVER",
        obj:  obj,
        phs:  phs,
        rslt: rslt
    });
}


module.exports =
{
    CF: CF,
    ula: ula
};
