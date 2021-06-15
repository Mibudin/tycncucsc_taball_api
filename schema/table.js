"use strict";

const SchemaObject = require("schema-object");
const CS = require("./common");


const DistanceSet =
{
    left:   CS.NumberPos,
    middle: CS.NumberPos,
    right:  CS.NumberPos
};

const TableRecordSchema = new SchemaObject(
    {
        tableID:    CS.NumberPosInt,
        // updateTime: CS.DateISO,
        updateTime: {type: Date/*, default: new Date()*/},
        isOccupied: {type: Boolean/*, default: false*/},
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

                this.tableID = i ? i : 0;
                this.updateTime = date ? date : new Date();
                this.isOccupied = false;
                this.distances = {a: {left: 0, middle: 0, right: 0},
                                  b: {left: 0, middle: 0, right: 0}};
                this.scores = {a: 0, b: 0};
            }
        }
    }
);


module.exports = TableRecordSchema;
