"use strict";

const Express = require("express");
const router = Express.Router();

const _ = require("underscore");

const userController = require("../controllers/userController");
const tableController = require("../controllers/tableController");


/**
 * General middlewares
 */
router.use((req, res, next) => {
    // TODO: Improve logs

    let id = req.header("authorization-id");
    let key = req.header("authorization-key");

    console.log("> [HTTP Request] - " + new Date().toISOString());
    console.log("  HTTP: (" + req.method + ") \`" + req.url + "\`");

    if(id === undefined)
    {
        console.log("  User: undefined (Unauthorized)");
        res.status(401).send("401 Unauthorized: No authorization ID given!");
        return;
    }
    if(key === undefined)
    {
        console.log("  User: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: No authorization key given!");
        return;
    }

    let userData = userController.authUsers(id, key);
    if(userData === undefined)
    {
        console.log("  User: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: User not found!");
    }
    else if(userData.userName === undefined)
    {
        console.log("  User: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: Wrong authorization key given!");
    }
    else
    {
        console.log("  User: \"" + id
                    + "\" (Authorized: \"" + userData.userName +"\")");
        next();
    }
});

/**
 * `/`
 * General
 */
router.route("/")
    .all((req, res) => {
        res.send("~TYCNCUCSC TABALL API~");
    });

/**
 * `/tables`
 * Get usage records of table-tennis tables
 */
router.route("/tables")
    .get((req, res) => {
        res.json(tableController.getTableRecords());
    })
    .patch((req, res) => {
        tableController.patchTableRecords(_.extend([], req.body));
        res.status(200).send("200 OK");
    });

router.route("/tables/:tableID")
    .get((req, res) => {
        let tableRecord = tableController.getTableRecord(Number(req.params.tableID));
        if(tableRecord === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found.");
            return;
        }
        res.json(tableRecord);
    })
    .patch((req, res) => {
        if(tableController.patchTableRecord(Number(req.params.tableID), _.extend({}, req.body)) === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found." +
                      "Or, the given `tableID` is not equal to the given `tableRecord`\'s.");
            return;
        }
        res.status(200).send("200 OK");
    });

/**
 * Other exceptions handling
 */
router.route("/brewCoffee")
    .all((req, res) => {
        res.status(418).send("418 I'm a teapot");
    });

router.route("/*")
    .all((req, res) => {
        res.status(404).send("404 Not Found");
    });

/**
 * Error handling
 */
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 Internal Server Error: Something broke!");
});


/**
 * Initialize the router
 * @param {Number} tablesNum 
 * @returns The router
 */
function initRouter(tablesNum)
{
    // let a = {x: 1, y: 2};
    // let b = {y: 3, z: 4};
    // console.log(_.extend(a, b));
    // console.log(a);

    tableController.initTableRecords(tablesNum);
    return router;
}


module.exports =
{
    initRouter: initRouter
};
