"use strict";


const _ = require("underscore");
const _merge = require("merge-deep");


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
