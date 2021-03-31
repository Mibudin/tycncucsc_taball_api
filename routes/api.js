"use strict"

const express = require("express");
const router = express.Router();

/**
 * General
 */
router.route("/")
    .all((req, res) => {
        res.send("~TYCNCUCSC TABALL~");
    });


module.exports = router;
