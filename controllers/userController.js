"use strict";

const UserRecordSchema = require("../schema/user");

const userRecords = require("../data/userRecords.json");


/**
 * 
 * @param {string} id 
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
            {userName: user.userName, userID: user.userID}).toObject();
    }
    else
    {
        return new UserRecordSchema(
            {userName: undefined, userID: user.userID}).toObject();
    }
}


module.exports = 
{
    authUsers: authUsers
};
