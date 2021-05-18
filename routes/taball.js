"use strict";

const Express = require("express");
const router = Express.Router();

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
    .all((req, res) => {
        // res.status(200).send("~TYCNCUCSC TABALL WEBSITE~");
        let pugPath = viewController.pathnameToPugPath(req.path);
        let renderData = {};
        res.status(200).render(pugPath, renderData);
        return;
    });


module.exports = router;
