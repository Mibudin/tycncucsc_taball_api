"use strict"

const express = require("express");
const app = express();

/**
 * Express APP use: body parsing
 * Serve body part parsing
 */
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({extended: true}));  // For parsing application/x-www-form-urlencoded

/**
 * Express APP use: `/assets`
 * Serve static files.
 */
app.use('/assets', express.static('assets'));

/**
 * Express APP use: `/api/v0`
 * Serve the API.
 */
const apiRouter = require("./routes/api");
app.use("/api/v0", apiRouter);

/**
 * Express APP start server
 */
let port = process.env.PORT || 3000;
app.listen(port);
console.log("server is now started on port:" + port);
