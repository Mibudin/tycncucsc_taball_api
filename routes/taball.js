"use strict";

const Express = require("express");
const router = Express.Router();

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
    .all((req, res) => {
        // res.status(200).send("~TYCNCUCSC TABALL WEBSITE~");
        // let pugPath = viewController.pathnameToPugPathView(req.path);
        // let renderData = {};
        // res.status(200).render(pugPath, renderData);  // TODO: Outer Pug render?
        res.status(200).send(
            viewController.renderViewPage(req.path,
                {
                    tableRecords: tableController.getTableRecords()
                }));
        return;
    });


module.exports = router;
