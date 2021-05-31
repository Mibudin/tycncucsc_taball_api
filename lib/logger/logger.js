"use strict";


/**
 * 
 * @param {objetc} msgObj
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
 * 
 * @param {objetc} msgObj
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

/**
 * 
 * @param {objetc} msgObj
 */
function logTaball(msgObj)
{

}


module.exports =
{
    logServer: logServer,
    logReqRes: logReqRes,
    logTaball: logTaball
}
