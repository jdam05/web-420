/**
 * Title: damir-customer.js
 * Date: November 30, 2022
 * Author: Jamal Eddine Damir
 * Description: MondoDB Customer collection schema
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// requiring modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating composer schema with two string files
let lineItemSchema = new Schema({
	name: { type: String },
	price: { type: Number },
	quantity: { type: Number },
});

let invoiceSchema = new Schema({
	subtotal: { type: Number },
	tax: { type: Number },
	dateCreated: { type: String },
	dateShipped: { type: String },
	lineItem: [lineItemSchema],
});

let customerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	userName: { type: String },
	invoices: [invoiceSchema],
});

// Exporting composer schema
module.exports = mongoose.model("Customer", customerSchema);
