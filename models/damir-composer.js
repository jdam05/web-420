/**
 * Title: damir-composer.js
 * Date: November 19, 2022
 * Author: Jamal Eddine Damir
 * Description: MondoDB Composer collection schema
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// requiring modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating composer schema with two string files
let composerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
});

// Exporting composer schema
module.exports = mongoose.model("Composer", composerSchema);
