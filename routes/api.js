"use strict";

const Express = require("express");
const router = Express.Router();

const tableController = require("../controllers/tableController");


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
    });

router.route("/tables/:tableID")
    .get((req, res) => {
        let tableRecord = tableController.getTableRecord(Number(req.params.tableID));
        if(tableRecord === undefined)
        {
            res.status(400)
                .send("400 Bad Request: The table record with the given `tableID` was not found.");
        }
        res.json(tableRecord);
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


module.exports = router;
