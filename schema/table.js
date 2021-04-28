"use strict";

const SchemaObject = require("schema-object");


const TableRecordSchema = new SchemaObject(
    {
        tableID: Number,
        isOccupied: Boolean
    },
    {
        strict: true
    }
);


module.exports = TableRecordSchema;
