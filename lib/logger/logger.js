"use strict";


/**
 * The general logging function for the server parts.
 * @param {object} msgObj
 */
function logServer(msgObj)
{
    const msg = 
        `[${msgObj.time}]`
      + `[${msgObj.cat}]`
      + `[${msgObj.obj}]`
      + `[${msgObj.phs}]`
      + `[${msgObj.rslt}]`;

    console.log(msg);
}

/**
 * The general logging function for the request and response parts.
 * @param {object} msgObj
 */
function logReqRes(msgObj)
{
    const msg = 
        `[${msgObj.time}]`
      + `[${msgObj.cat}]`
      + `[${msgObj.req.protocol.toUpperCase()}]`
      + `[${msgObj.req.ip}]`
      + `[${msgObj.req.method}]`
      + `[${msgObj.req.originalUrl}]`
      + `[${msgObj.res.statusCode}]`;

    console.log(msg);
}


module.exports =
{
    logServer: logServer,
    logReqRes: logReqRes
}
