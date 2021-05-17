"use strict";

const SchemaObject = require("schema-object");
const CS = require("./common");


const DistanceSet =
{
    left:   CS.NumberPosInt,
    middle: CS.NumberPosInt,
    right:  CS.NumberPosInt
};

const TableRecordSchema = new SchemaObject(
    {
        tableID:    CS.NumberPosInt,
        updateTime: CS.DateISO,
        isOccupied: {type: Boolean, default: false},
        distances:
        {
            a: DistanceSet,  // In centimeter
            b: DistanceSet
        },
        scores:
        {
            a: CS.NumberPosInt,
            b: CS.NumberPosInt
        }
    },
    {
        strict: true,
        constructors:
        {
            // default: function(value)
            // {
            //     this.populate(value);

            //     this.scores.a = Number.parseInt(this.scores.a);
            //     this.scores.b = Number.parseInt(this.scores.b);
            // },
            init: function(i, date)
            {
                this.super();

                this.tableID = i;
                this.updateTime = date;
            }
        }
    }
);


module.exports = TableRecordSchema;
