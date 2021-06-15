"use strict";


const _ = require("underscore");
const _merge = require("merge-deep");

const TableRecordSchema = require("../schema/table");

// Merge a `source` object to a `target` recursively
const merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
    }
  
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }

let alpha = {a: {b: 3, c: 4}};
let beta = {a: {c: 5}, d: 7};

// console.log(_.merge(alpha, beta));
console.log(_merge(alpha, beta));
console.log(alpha);
// console.log(_.extend(alpha, beta));
console.log(_.clone([4, 6, 2]));

console.log(_merge(
{
    tableID: 2,
    updateTime: "2021-06-15T14:33:50.843Z",
    isOccupied: false,
    distances: {
      a: { left: 0, middle: 0, right: 0 },
      b: { left: 0, middle: 0, right: 0 }
    },
    scores: { a: 0, b: 0}
},
{
    tableID: 2,
    updateTime: "2021-06-15T14:34:47.105Z",
    isOccupied: undefined,
    distances: {
      a: { left: 0, middle: 0, right: 0 },
      b: { left: 0, middle: 0, right: 0 }
    },
    scores: { a: 34 }
}));

console.log(_merge(TableRecordSchema.init().toObject(), new TableRecordSchema(
    {
        tableID: 2,
        scores: { a: 34 }
    }
).toObject()));
console.log(new TableRecordSchema(
    {
        tableID: 2,
        scores: { a: 34 }
    }
).toObject());

console.log(_merge(
      {
        tableID: 2,
        updateTime: "2021-06-15T14:58:11.163Z",
        isOccupied: false,
        distances: {
          a: { left: 0, middle: 0, right: 0 },
          b: { left: 0, middle: 0, right: 0 }
        },
        scores: { a: 0, b: 0 }
      },
      {
        tableID: 2,
        updateTime: "2021-06-15T14:59:26.199Z",
        scores: { a: 87 },
        isOccupied: undefined
      }
))
