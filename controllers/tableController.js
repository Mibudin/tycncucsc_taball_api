"use strict";

const _ = require("underscore");

const TableRecordSchema = require("../schema/table");


let tableAmount = 0;
let tableRecords = [];


function getTableRecords()
{
    return _.extend({}, tableRecords);
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

    return _.extend({}, tableRecord);
}

/**
 * 
 * @param {Number} _tableAmount 
 */
function initTableRecords(_tableAmount)
{
    tableAmount = _tableAmount;
    tableRecords = new Array(tableAmount - 1);

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
 * @param {TableRecord[]} _tableRecord
 */
function setTableRecordsUsage(_tableRecords)
{
    for(let i = 0; i < _tableRecords.length; i++)
    {
        _tableRecords[i] = new TableRecordSchema(_tableRecords[i]);
    }
    _tableRecords.sort((a, b) => a.tableID - b.tableID);

    for(let i = 0, j = 0; i < tableRecords.length && j < _tableRecords.length;)
    {
        if(tableRecords[i].tableID === _tableRecords[j].tableID &&
            _tableRecords[j].isOccupied !== undefined)
        {
            tableRecords[i].isOccupied = _tableRecords[j].isOccupied;
            i++, j++;
        }
        else if(tableRecords[i].tableID < _tableRecords[j].tableID) i++;
        else j++;
    }
}

/**
 * 
 * @param {TableRecord} _tableRecord
 */
function setTableRecordUsage(_tableRecord)
{
    _tableRecord = new TableRecordSchema(_tableRecord);
    let tableRecord = tableRecords.find(element => element.tableID === _tableRecord.tableID);
    if(tableRecord === undefined || _tableRecord.isOccupied === undefined)
    {
        return undefined;
    }

    tableRecord.isOccupied = _tableRecord.isOccupied;
    return tableRecord.tableID;
}


module.exports = 
{
    getTableRecords: getTableRecords,
    getTableRecord: getTableRecord,
    initTableRecords: initTableRecords,
    setTableRecordsUsage: setTableRecordsUsage,
    setTableRecordUsage: setTableRecordUsage
};
