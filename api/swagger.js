"use strict";

const CF = require("../app").CF;


/**
 * Let the Express application use the Swagger.
 * @param {"Express"} app The Express applicaiton.
 * @param {object} paths The path to use the Swagger.
 */
function useSwagger(app, paths)
{
    const swaggerUI = require("swagger-ui-express");
    let swaggerDocument = require("js-yaml").load(require("fs").readFileSync("./api/swagger.yaml", "utf8"));
    swaggerDocument.host = CF.server.wan.host ? `${CF.server.wan.host}:${CF.server.wan.port}`
                                              : `${CF.server.lan.host}:${CF.server.lan.port}`
    swaggerDocument.basePath = paths.api;

    /**
     * Express APP use: `/api-docs/v0`
     * Serve the Swagger document of the API
     */
    const swaggerUiOptions = 
    {
        // customCss: ".swagger-ui .topbar{display: none}",
        // customCss: ".swagger-ui .info .description::after{url("./favicon-pixel-xmas-smooth.ico");}",
        // customCssUrl: "/assets/swagger/swagger-ui-dark.css",
        customJs: "/assets/swagger/swagger-ui.js",
        customfavIcon: "/assets/swagger/favicon.ico",
        customSiteTitle: "~ TYCNCUCSC TABALL API ~"
    };
    app.use(paths.docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptions));
    
    /**
     * Express APP use: `/api-docs-dark/v0`
     * Serve the Swagger document of the API (in the dark theme)
     */
    if(!paths.docsDark) return;
    const swaggerUiOptionsDark = 
    {
        // customCss: ".swagger-ui .topbar{display: none}",
        // customCss: ".swagger-ui .info .description::after{url("./favicon-pixel-xmas-smooth.ico");}",
        customCssUrl: "/assets/swagger/swagger-ui-dark.css",
        customJs: "/assets/swagger/swagger-ui.js",
        customfavIcon: "/assets/swagger/favicon.ico",
        customSiteTitle: "~ TYCNCUCSC TABALL API ~"
    };
    app.use(paths.docsDark, swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptionsDark));
}


module.exports = 
{
    useSwagger: useSwagger
}
