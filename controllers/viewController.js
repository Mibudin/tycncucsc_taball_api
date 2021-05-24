"use strict";

const Pug = require("pug");


let pageObjects = new Map();


/**
 * 
 * @param {string[]} pathnames 
 */
function initViewPages(pathnames)
{
    pathnames.forEach(value => {
        pageObjects.set(value, Pug.compileFile(pathnameToPugPath(value)));
    });
}

/**
 * 
 * @param {string} pathname 
 * @param {Object} renderData 
 * @returns 
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
 * 
 * @param {string} pathname 
 * @returns 
 */
function pathnameToPugPath(pathname)
{
    return "views/" + pathnameToPugPathView(pathname) + ".pug";
}

/**
 * 
 * @param {string} pathname 
 * @returns 
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
