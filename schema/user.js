"use strict";

const SchemaObject = require("schema-object");


const UserRecordSchema = new SchemaObject(
    {
        userName: String,
        userID: String
    }
);


module.exports = UserRecordSchema;
