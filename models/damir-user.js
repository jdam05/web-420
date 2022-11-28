/**
 * Title: damir-user.js
 * Date: November 26, 2022
 * Author: Jamal Eddine Damir
 * Description: MondoDB user collection schema
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// requiring modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating user schema
let userSchema = new Schema({
	userName: { type: String },
	password: { type: String },
	emailAddress: { type: Array },
});

// Exporting user schema
module.exports = mongoose.model("User", userSchema);
