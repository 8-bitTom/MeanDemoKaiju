/**
 * Created with IntelliJ IDEA.
 * User: tmarra
 * Date: 11/4/13
 * Time: 3:11 PM
 * To change this template use File | Settings | File Templates.
 */
var Mongoose = require('mongoose');

exports.KaijuSchema = new Mongoose.Schema({
    name : {type : String, required : true, unique: true},
    discovered : {type: Date, required: false},
    appearances: [Date],
    images: [String],
    svg: String,
    hasSVG: Boolean,
    strength: {type: Number, min: -1, max: 100},
    speed: {type: Number, min: -1, max: 100},
    energy: {type: Number, min: -1, max: 100},
    height: Number,
    description: String,
    powers: [String],
    defeated: Boolean,
    fought: [{ name: String, victory : Boolean}]
});