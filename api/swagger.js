"use strict";

/**
 * 
 * @param {"Express"} app 
 */
function useSwagger(app)
{
    const swaggerUI = require("swagger-ui-express");
    const swaggerDocument = require("js-yaml").load(require("fs").readFileSync("./api/swagger.yaml", "utf8"));

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
    app.use("/api-docs/v0", swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptions));
    
    /**
     * Express APP use: `/api-docs-dark/v0`
     * Serve the Swagger document of the API (in the dark theme)
     */
    const swaggerUiOptionsDark = 
    {
        // customCss: ".swagger-ui .topbar{display: none}",
        // customCss: ".swagger-ui .info .description::after{url("./favicon-pixel-xmas-smooth.ico");}",
        customCssUrl: "/assets/swagger/swagger-ui-dark.css",
        customJs: "/assets/swagger/swagger-ui.js",
        customfavIcon: "/assets/swagger/favicon.ico",
        customSiteTitle: "~ TYCNCUCSC TABALL API ~"
    };
    app.use("/api-docs-dark/v0", swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptionsDark));
}


module.exports = 
{
    useSwagger: useSwagger
}
