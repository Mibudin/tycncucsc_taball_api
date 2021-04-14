"use strict";

const SchemaObject = require("schema-object");


const TableSchema = new SchemaObject(
    {
        tableID: Number,
        isUsed: Boolean
    }
);


module.exports = TableSchema;
