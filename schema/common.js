"use strict"

const _ = require("underscore");


const NumberPos =
{
    type: Number,
    min: 0,
    default: 0
};

const NumberPosInt = _.extend(
{
    transform: function(value)
    {
        return Number.parseInt(value);
    }
}, NumberPos);

const DateISO =
{
    type: String,
    default: new Date(0).toISOString(),
    transform: function(value)
    {
        return value instanceof Date ?
            value.toISOString() : new Date(value).toISOString();
    }
};


module.exports =
{
    NumberPos: NumberPos,
    NumberPosInt: NumberPosInt,
    DateISO: DateISO
};
