"use strict";

const TableRecordSchema = require("../schema/table");


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
        tableRecords[i] = new TableRecordSchema(
            {
                tableID: i,
                isOccupied: false
            }
        );
    }
}

/**
 * 
 * @param {Number} tableID 
 * @param {Boolean} isOccupied 
 */
function setTableRecordsUsage(tableID, isOccupied)
{
    tableRecords.find(element => element.tableID === tableID).isOccupied = isOccupied;
}


module.exports = 
{
    getTableRecords: getTableRecords,
    getTableRecord: getTableRecord,
    initTableRecords: initTableRecords,
    setTableRecordsUsage: setTableRecordsUsage
};
