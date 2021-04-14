"use strict";

const SchemaObject = require("schema-object");


const TableRecordSchema = new SchemaObject(
    {
        tableID: Number,
        isOccupied: Boolean
    }
);


module.exports = TableRecordSchema;
