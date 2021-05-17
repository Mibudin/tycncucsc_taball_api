"use strict";

const Express = require("express");
const router = Express.Router();


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
    .all((req, res) => {
        res.status(200).send("~TYCNCUCSC TABALL WEBSITE~");
        return;
    });


module.exports = router;
