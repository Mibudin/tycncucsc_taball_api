"use strict";


/**
 * 
 * @param {string} pathname 
 * @returns 
 */
function pathnameToPugPath(pathname)
{
    if(pathname === "/") return "pug/root";
    else                 return "pug" + pathname;
}


module.exports =
{
    pathnameToPugPath: pathnameToPugPath
}
