"use strict";

const Express = require("express");
const router = Express.Router();

const logger = require("../lib/logger/logger");

const tableController = require("../controllers/tableController");
const viewController = require("../controllers/viewController");


/**
 * General middlewares
 */
router.use((req, res, next) => {
    next();
    return;
});

/**
 * `/`
 * General
 */
router.route("/")
    // .all((req, res) => {
    .get((req, res) => {
        // res.status(200).send("~TYCNCUCSC TABALL WEBSITE~");
        // let pugPath = viewController.pathnameToPugPathView(req.path);
        // let renderData = {};
        // res.status(200).render(pugPath, renderData);
        res.status(200).send(
            viewController.renderViewPage(req.path,
                {
                    tableRecords: tableController.getTableRecords()
                }));
        logMsg(req, res);
        return;
    });

/**
 * Other exceptions handling
 */
router.route("/*")
    .all((req, res) => {
        res.status(404).send("404 Not Found");
        logMsg(req, res);
        return;
    });

/**
 * Error handling
 */
router.use((err, req, res, next) => {
    res.status(500).send("500 Internal Server Error: Something broke!");
    logMsg(req, res);
    console.error(err.stack);
    return;
});


/**
 * The general logging function.
 * @param {"Request"} req The reauest.
 * @param {"Response"} res The response.
 */
function logMsg(req, res)
{
    logger.logReqRes({
        time: new Date().toISOString(),
        cat:  "TABALL",
        req:  req,
        res:  res
    });
}

module.exports = router;
