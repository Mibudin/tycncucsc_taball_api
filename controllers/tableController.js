"use strict";

const _ = require("underscore");

const TableRecordSchema = require("../schema/table");


let tableAmount = 0;
let tableRecords = [];  // TODO: Should be sorted?


function getTableRecords()
{
    return _.extend([], tableRecords);
}

/**
 * 
 * @param {number} tableID 
 * @returns 
 */
function getTableRecord(tableID)
{
    // let tableRecord = tableRecords.find(element => element.tableID === tableID);
    // if(tableRecord === undefined) return undefined;
    let tableRecord;
    let s = 0, m = 0, e = tableRecords.length;
    while(s < e)
    {
        m = parseInt((s + e) / 2);
        tableRecord = tableRecords[m];
             if(tableRecord.tableID < tableID) s = m + 1;
        else if(tableRecord.tableID > tableID) e = m;
        else                                   break;
    }
    if(s >= e) return undefined;

    return _.extend({}, tableRecord);
}

/**
 * 
 * @param {number} _tableAmount 
 */
function initTableRecords(_tableAmount)
{
    tableAmount = Number(_tableAmount);
    tableRecords = new Array(tableAmount - 1);
    const nowTime = new Date();

    for(let i = 0; i < tableAmount; i++)
    {
        // TODO:
        // tableRecords[i] = new TableRecordSchema(
        //     {
        //         tableID: i,
        //         isOccupied: false
        //     }
        // ).toObject();
        tableRecords[i] = TableRecordSchema.init(i, nowTime).toObject();
    }
}

/**
 * 
 * @param {"TableRecord"[]} _tableRecords
 */
function patchTableRecords(_tableRecords)
{
    for(let i = 0; i < _tableRecords.length; i++)
    {
        _tableRecords[i] = new TableRecordSchema(_tableRecords[i]).toObject();
    }
    _tableRecords.sort((a, b) => a.tableID - b.tableID);

    for(let i = 0, j = 0; i < tableRecords.length && j < _tableRecords.length;)
    {
        if(_tableRecords[j].tableID === undefined) j++;
        else if(tableRecords[i].tableID === _tableRecords[j].tableID)
        {
            _.extend(tableRecords[i], _tableRecords[j]);
            i++, j++;
        }
        else if(tableRecords[i].tableID < _tableRecords[j].tableID) i++;
        else j++;
    }
}

/**
 * 
 * @param {number} tableID
 * @param {"TableRecord"} _tableRecord
 */
function patchTableRecord(tableID, _tableRecord)
{
    tableID = Number(tableID);
    _tableRecord = new TableRecordSchema(_tableRecord).toObject();
    if(_tableRecord.tableID === undefined || tableID !== _tableRecord.tableID) return undefined;

    let tableRecord = undefined;

    // let s = 0, m, e = tableRecords.length - 1;
    // while(s <= e)
    // {
    //     m = parseInt(s + (e - s) / 2);
    //     tableRecord = tableRecords[m];
    //          if(tableRecord.tableID < tableID) s = m + 1;
    //     else if(tableRecord.tableID > tableID) e = m - 1;
    //     else                                   break;
    // }
    // if(s > e || tableRecord === undefined) return undefined;

    // Faster Binary search (maybe)
    let s = 0, m = 0, e = tableRecords.length;
    while(s < e)
    {
        m = parseInt((s + e) / 2);
        tableRecord = tableRecords[m];
             if(tableRecord.tableID < tableID) s = m + 1;
        else if(tableRecord.tableID > tableID) e = m;
        else                                   break;
    }
    if(s >= e) return undefined;

    _.extend(tableRecord, _tableRecord);
    return tableRecord.tableID;
}


module.exports = 
{
    getTableRecords: getTableRecords,
    getTableRecord: getTableRecord,
    initTableRecords: initTableRecords,
    patchTableRecords: patchTableRecords,
    patchTableRecord: patchTableRecord
};
