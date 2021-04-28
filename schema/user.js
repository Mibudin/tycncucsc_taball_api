"use strict";

const SchemaObject = require("schema-object");


const UserRecordSchema = new SchemaObject(
    {
        userName: String,
        userID: String
    },
    {
        strict: true
    }
);


module.exports = UserRecordSchema;
