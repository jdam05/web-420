/**
 * Title: damir-person.js
 * Date: November 19, 2022
 * Author: Jamal Eddine Damir
 * Description: MondoDB Person collection schema
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// requiring modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating composer schema with one string field
let roleSchema = new Schema({
	text: { type: String },
});

// Creating dependent schema with two string fields
let dependentSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
});

// Creating person schema with fields of string and array types
let personSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	roles: [roleSchema],
	dependents: [dependentSchema],
	birthDate: { type: String },
});

// Exporting person schema
module.exports = mongoose.model("Person", personSchema);
