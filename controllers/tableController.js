"use strict";

const _ = require("underscore");
const _merge = require("merge-deep");

const TableRecordSchema = require("../schema/table");

const CF = require("../app").CF;
const ula = require("../app").ula;


let tableAmount = 0;
let tableRecords = [];  // Should be SORTED


function getTableRecords()
{
    // return _.extend([], tableRecords);
    // return _.clone(tableRecords);
    return _merge([], tableRecords)
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

    // return _.extend({}, tableRecord);
    // return _.clone(tableRecord);
    return _merge({}, tableRecord);
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
        // tableRecords[i] = new TableRecordSchema(
        //     {
        //         tableID: i,
        //         isOccupied: false
        //     }
        // ).toObject();
        tableRecords[i] = TableRecordSchema.init(i, new Date(nowTime)).toObject();
    }
}


/**
 * 
 * @param {number} _tableAmount 
 */
async function initTableRecordsDb(_tableAmount)
{
    let _tableRecords = await ula.searchMany(CF.mongo.db.colles.table.name,
        {}, {fields: {_id: 0}, sort: {updateTime: -1}, limit: 1});

    initTableRecords(_tableAmount);
    if(_tableRecords.length === 0) recordTableRecords();
    else
    {
        _tableRecords = _tableRecords[0].records;
        for(let i = 0; i < _tableRecords.length; i++)
        {
            // _.extend(tableRecords[_tableRecords[i].tableID ? _tableRecords[i].tableID : i],
            //     new TableRecordSchema(_tableRecords[i]).toObject());
            _.extend(
                tableRecords[_tableRecords[i].tableID ? _tableRecords[i].tableID : i],
                _merge(tableRecords[_tableRecords[i].tableID ? _tableRecords[i].tableID : i],
                    new TableRecordSchema(_tableRecords[i]).toObject()));
            // _merge(tableRecords[_tableRecords[i].tableID ? _tableRecords[i].tableID : i],
            //     new TableRecordSchema(_tableRecords[i]).toObject());
        }
        if(_tableRecords.length < _tableAmount) recordTableRecords();
    }
}

/**
 * 
 * @param {"TableRecord"[]} _tableRecords
 * @returns
 */
function patchTableRecords(_tableRecords)
{
    const nowTime = new Date();
    for(let i = 0; i < _tableRecords.length; i++)
    {
        _tableRecords[i] = new TableRecordSchema(_tableRecords[i]);
        _tableRecords[i].updateTime = new Date(nowTime);
        _tableRecords[i] = _tableRecords[i].toObject();
        _tableRecords[i].isOccupied = undefined;
    }
    _tableRecords.sort((a, b) => a.tableID - b.tableID);
    // console.log(_tableRecords);
    
    let changed = false;
    for(let i = 0, j = 0; i < tableRecords.length && j < _tableRecords.length;)
    {
        if(_tableRecords[j].tableID === undefined) j++;
        else if(tableRecords[i].tableID === _tableRecords[j].tableID)
        {
            if(!changed) changed = true;
            // _.extend(tableRecords[i], _tableRecords[j]);
            _.extend(tableRecords[i], _merge(tableRecords[i], _tableRecords[j]));
            // _merge(tableRecords[i], _tableRecords[j]);
            
            // TODO: Determine whther occupied!!!
            tableRecords[i].isOccupied = determineOccupied(tableRecords[i].distances);

            i++, j++;
        }
        else if(tableRecords[i].tableID < _tableRecords[j].tableID) i++;
        else j++;
    }
    // console.log(tableRecords);
    
    return changed;
}

/**
 * 
 * @param {number} tableID
 * @param {"TableRecord"} _tableRecord
 * @returns
 */
function patchTableRecord(tableID, _tableRecord)
{
    tableID = Number(tableID);
    _tableRecord = new TableRecordSchema(_tableRecord);
    _tableRecord.updateTime = new Date();
    _tableRecord = _tableRecord.toObject();
    _tableRecord.isOccupied = undefined;
    if(_tableRecord.tableID === undefined || tableID !== _tableRecord.tableID) return false;

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
    if(s >= e) return false;

    // _.extend(tableRecord, _tableRecord);
    // console.log(_tableRecord);
    _.extend(tableRecord, _merge(tableRecord, _tableRecord));
    // _merge(tableRecord, _tableRecord);
    // console.log(tableRecord);
    // TODO: Determine whther occupied!!!
    tableRecord.isOccupied = determineOccupied(tableRecord.distances);

    return true;
}

function recordTableRecords()
{
    ula.ul.pushOne(CF.mongo.db.colles.table.name,
        {
            // updateTime: new Date().toISOString(),
            updateTime: new Date(),
            // records: _.extend([], tableRecords)
            records: _merge([], tableRecords)
        },
        ()=>{});
}

// 每個子板回來的數字
// 主版判斷子板回來的數字的判斷

// 版本一 （50公分以內會被加重）
// int  num=0
// Boolean player a
// Boolean player b
// for(int i=0;i<5;I++){
//     if(dis>0 and dis<=50)
//         num=num+2
//     if (dis>50 and dis<=80)
//         num=num+1
//     sleep(1)
// }
// If (num>8)
//     player a =T

// 同樣也給player b這樣判定

// 當player a 是T 且player b 是T
//     有人


// 版本二

// int  num=0

// for(int i=0;i<5;I++){
//     if(dis>0 and dis<=80)
//         num=num+1
//    sleep(1)
// }
// If (num>8)
//     player a is ture
// 同樣也給player b這樣判定

// 當player a 是T 且player b 是T
//     有人

/**
 * 
 * @param {Object} distances
 * @returns
 */
function determineOccupied(distances)
{
    const dists = [
        distances.a.left,
        distances.a.middle,
        distances.a.right,
        distances.b.left,
        distances.b.middle,
        distances.b.right];

    let sides = [0, 0];
    for(let i = 0; i < 6; i++)
    {
        if(dists[i] > 0)
        {
                 if(dists[i] <= 50) sides[i < 3 ? 0 : 1] += 3; // FIXME: 2
            else if(dists[i] <= 80) sides[i < 3 ? 0 : 1] += 3; // FIXME: 1
        }
    }

    if(sides[0] >= 3 && sides[1] >= 3) return true;
    else                               return false;
}


module.exports = 
{
    getTableRecords: getTableRecords,
    getTableRecord: getTableRecord,
    initTableRecords: initTableRecords,
    initTableRecordsDb: initTableRecordsDb,
    patchTableRecords: patchTableRecords,
    patchTableRecord: patchTableRecord,
    recordTableRecords: recordTableRecords
};
