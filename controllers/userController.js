"use strict";

const UserRecordSchema = require("../schema/user");

const userRecords = require("../data/userRecords.json");


/**
 * 
 * @param {String} id 
 * @param {string} key 
 * @returns 
 */
function authUsers(id, key)
{
    let user = userRecords.find(element => id === element.userID);
    if(user === undefined)
    {
        return undefined;
    }
    if(key === user.userKey)
    {
        return new UserRecordSchema(
            {userName: user.userName, userID: user.userID});
    }
    else
    {
        return new UserRecordSchema(
            {userName: undefined, userID: user.userID});
    }
}


module.exports = 
{
    authUsers: authUsers
};
