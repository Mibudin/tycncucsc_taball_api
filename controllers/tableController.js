"use strict";

const TableSchema = require("../schema/table");


let tableAmount = 0;
let tableRecords = [];


function getTableRecords()
{
    return JSON.parse(JSON.stringify(tableRecords));
}

/**
 * 
 * @param {Number} tableID 
 * @returns 
 */
function getTableRecord(tableID)
{
    let tableRecord = tableRecords.find(element => element.tableID === tableID);
    if(tableRecord === undefined)
    {
        return undefined;
    }

    return JSON.parse(JSON.stringify(tableRecord));
}

/**
 * 
 * @param {Number} _tableAmount 
 */
function initTableRecords(_tableAmount)
{
    tableAmount = _tableAmount;
    tableRecords = new Array(tableAmount);

    for(let i = 0; i < tableAmount; i++)
    {
        tableRecords[i] = new TableSchema(
            {
                tableID: i,
                isUsed: false
            }
        );
    }
}

/**
 * 
 * @param {Number} tableID 
 * @param {Boolean} isUsed 
 */
function setTableRecordsUsage(tableID, isUsed)
{
    tableRecords.find(element => element.tableID === tableID).isUsed = isUsed;
}


module.exports = 
{
    getTableRecords: getTableRecords,
    getTableRecord: getTableRecord,
    initTableRecords: initTableRecords,
    setTableRecordsUsage: setTableRecordsUsage
};
