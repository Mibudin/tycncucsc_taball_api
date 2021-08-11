"use strict";

const Pug = require("pug");


let pageObjects = new Map();


/**
 * Initialize the page objects by multiple pathnames.
 * @param {string[]} pathnames The pathnames of the Pug files.
 */
function initViewPages(pathnames)
{
    pathnames.forEach(value => {
        pageObjects.set(value, Pug.compileFile(pathnameToPugPath(value)));
    });
}

/**
 * Render a page object to a HTML page data.
 * @param {string} pathname The pathname of the Pug file.
 * @param {Object} renderData The data object used in rendering.
 * @returns The rendered HTML page data.
 */
function renderViewPage(pathname, renderData)
{
    let renderer = pageObjects.get(pathname);
    // if(renderer === undefined)
    // {
    //     renderer = Pug.compileFile(pathnameToPugPath(pathname))
    //     pageObjects.set(pathname, renderer);
    // }
    return renderer(renderData);
}

/**
 * Translate the simple pathname to the corresponding full pathname.
 * @param {string} pathname The simple pathname to be translated.
 * @returns The translated full pathname.
 */
function pathnameToPugPath(pathname)
{
    return "views/" + pathnameToPugPathView(pathname) + ".pug";
}

/**
 * Translate the simple pathname to the corresponding Pug file pathname.
 * @param {string} pathname The simple pathname to be translated.
 * @returns The translated Pug file pathname.
 */
function pathnameToPugPathView(pathname)
{
    if(pathname === "/") return "pug/root";
    else                 return "pug" + pathname;
}


module.exports =
{
    initViewPages: initViewPages,
    renderViewPage: renderViewPage,
    pathnameToPugPath: pathnameToPugPath,
    pathnameToPugPathView: pathnameToPugPathView
}
