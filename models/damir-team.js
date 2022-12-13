/**
 * Title: damir-teams.js
 * Date: December 12, 2022
 * Author: Jamal Eddine Damir
 * Description: MondoDB Teams collection schema
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// requiring modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating composer schema with two string files
let playerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	salary: { type: Number },
});

let teamSchema = new Schema({
	name: { type: String },
	mascot: { type: String },
	players: [playerSchema],
});

module.exports = mongoose.model("Team", teamSchema);
