"use strict";

const Express = require("express");
const router = Express.Router();

const _ = require("underscore");

const logger = require("../lib/logger/logger");

const userController = require("../controllers/userController");
const tableController = require("../controllers/tableController");

const CF = require("../app").CF;


/**
 * General middlewares
 */
router.use((req, res, next) => {
    next();
    return;
});
// router.use((req, res, next) => {
//     // TODO: Improve logs

//     let id = req.header("authorization-id");
//     let key = req.header("authorization-key");

//     console.log("> [HTTP Request] - " + new Date().toISOString());
//     console.log("  HTTP: (" + req.method + ") \`" + req.url + "\`");

//     if(id === undefined)
//     {
//         console.log("  User: undefined (Unauthorized)");
//         if(CF.server.cf.apiAuth) res.status(401).send("401 Unauthorized: No authorization ID given!");
//         else                     next();
//         return;
//     }
//     else if(key === undefined)
//     {
//         console.log("  User: \"" + id + "\" (Unauthorized)");
//         if(CF.server.cf.apiAuth) res.status(401).send("401 Unauthorized: No authorization key given!");
//         else                     next();
//         return;
//     }

//     let userData = userController.authUsers(id, key);
//     if(userData === undefined)
//     {
//         console.log("  User: \"" + id + "\" (Unauthorized)");
//         if(CF.server.cf.apiAuth) res.status(401).send("401 Unauthorized: User not found!");
//         else                     next();
//         return;
//     }
//     else if(userData.userName === undefined)
//     {
//         console.log("  User: \"" + id + "\" (Unauthorized)");
//         if(CF.server.cf.apiAuth) res.status(401).send("401 Unauthorized: Wrong authorization key given!");
//         else                     next();
//         return;
//     }
//     else
//     {
//         console.log("  User: \"" + id
//                     + "\" (Authorized: \"" + userData.userName +"\")");
//         next();
//         return;
//     }
// });

/**
 * `/`
 * General
 */
router.route("/")
    .all((req, res) => {
        res.status(200).send("~TYCNCUCSC TABALL API~");
        logMsg(req, res);
        return;
    });

/**
 * `/tables`
 * Get usage records of table-tennis tables
 */
router.route("/tables")
    .get((req, res) => {
        res.status(200).json(tableController.getTableRecords());
        logMsg(req, res);
        return;
    })
    .patch((req, res) => {
        let changed = tableController.patchTableRecords(_.extend([], req.body));
        if(changed) tableController.recordTableRecords();
        else
        {
            res.status(404)
                .send("404 Not Found: The given table records did not correspond to any one in the server.");
            logMsg(req, res);
            return;
        }
        res.status(200).send();
        logMsg(req, res);
        return;
    });

router.route("/tables/scores")
    .get((req, res) => {
        let tableRecords = tableController.getTableRecords();
        tableRecords.forEach((value, index, array) => {
            array[index] = _.pick(value, ["tableID", "updateTime", "scores"]);
        });
        res.status(200).json(tableRecords);
        logMsg(req, res);
        return;
    });

router.route("/tables/:tableID")
    .get((req, res) => {
        let tableRecord = tableController.getTableRecord(Number(req.params.tableID));
        if(tableRecord === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found.");
            logMsg(req, res);
            return;
        }
        res.status(200).json(tableRecord);
        logMsg(req, res);
        return;
    })
    .patch((req, res) => {
        let changed = tableController.patchTableRecord(Number(req.params.tableID), _.extend({}, req.body));
        if(changed) tableController.recordTableRecords();
        else
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found." +
                      "Or, the given `tableID` is not equal to the given `tableRecord`\'s.");
            logMsg(req, res);
            return;
        }
        res.status(200).send();
        logMsg(req, res);
        return;
    });

router.route("/tables/scores/:tableID")
    .get((req, res) => {
        let tableRecord = tableController.getTableRecord(Number(req.params.tableID));
        if(tableRecord === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found.");
            logMsg(req, res);
            return;
        }
        res.status(200).json(_.pick(tableRecord, ["tableID", "updateTime", "scores"]));
        logMsg(req, res);
        return;
    });

/**
 * Other exceptions handling
 */
router.route("/brewCoffee")
    .all((req, res) => {
        res.status(418).send("418 I'm a teapot");
        logMsg(req, res);
        return;
    });

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
 * Initialize the router.
 * @deprecated Controllers initializations all in `app.js`.
 * @param {number} tablesNum 
 * @returns The router
 */
function initRouter(tablesNum)
{
    tableController.initTableRecords(tablesNum);
    return router;
}

/**
 * The general logging function.
 * @param {"Request"} req The request.
 * @param {"Response"} res The response.
 */
function logMsg(req, res)
{
    logger.logReqRes({
        time: new Date().toISOString(),
        cat:  "API",
        req:  req,
        res:  res
    });
}


module.exports = router;
// {
//     initRouter: initRouter
// };
