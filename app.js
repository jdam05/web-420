/**
 * Title: app.js
 * Date: October 19, 2022
 * Author: Jamal Eddine Damir
 * Description: Server file for class Web-420 assignments
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

// Requiring Modules
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Initializing express app
const app = express();

// Setting listening port
app.set("port", process.env.PORT || 3000);

// Setting app to use express.json()
app.use(express.json());

// Setting app to use express.urlencoded()
app.use(express.urlencoded({ extended: true }));

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "WEB 420 RESTFul APIs",
			version: "1.0.0",
		},
	},
	apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Creating server listening on port 3000
http.createServer(app).listen(app.get("port"), function () {
	console.log(`Application started and listening on port ${app.get("port")}`);
});
