"use strict";

const cf = require("js-yaml").load(require("fs").readFileSync("./config.yaml", "utf8"));

module.exports = cf;
