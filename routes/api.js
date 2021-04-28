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
    let id = req.header("authorization-id");
    let key = req.header("authorization-key");

    if(id === undefined)
    {
        console.log("Request from: undefined (Unauthorized)");
        res.status(401).send("401 Unauthorized: No authorization ID given!");
        return;
    }
    if(key === undefined)
    {
        console.log("Request from: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: No authorization key given!");
        return;
    }

    let userData = userController.authUsers(id, key);
    if(userData === undefined)
    {
        console.log("Request from: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: User not found!");
    }
    else if(userData.userName === undefined)
    {
        console.log("Request from: \"" + id + "\" (Unauthorized)");
        res.status(401).send("401 Unauthorized: Wrong authorization key given!");
    }
    else
    {
        console.log("Request from: \"" + id
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
        tableController.setTableRecordsUsage(_.extend([], req.body));
        res.status(200).send("200 OK");
    });

router.route("/tables/:tableID")
    .get((req, res) => {
        let tableRecord = tableController.getTableRecord(Number(req.params.tableID));
        if(tableRecord === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found.");
        }
        res.json(tableRecord);
    })
    .patch((req, res) => {
        if(tableController.setTableRecordUsage(_.extend({}, req.body)) === undefined)
        {
            res.status(404)
                .send("404 Not Found: The table record with the given `tableID` was not found.");
        }
        res.status(200).send("200 OK");
    });

/**
 * Other exceptions handling
 */
router.route("/brewCoffee")
    .all((req, res) => {
        res.status(418).send("408 I'm a teapot");
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


module.exports = router;
