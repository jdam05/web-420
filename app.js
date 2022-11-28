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
const composerAPI = require("./routes/damir-composer-routes");
const personAPI = require("./routes/damir-person-routes");
const userAPI = require("./routes/damir-session-routes");

// Initializing express app
const app = express();

// Setting listening port
app.set("port", process.env.PORT || 3000);

// Setting app to use express.json()
app.use(express.json());

// Setting app to use express.urlencoded()
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB Atlas
const conn =
	"mongodb+srv://web420_user:s3cret@bellevueuniversity.5vradwb.mongodb.net/web420DB";
mongoose
	.connect(conn, {
		promiseLibrary: require("bluebird"),
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log(`Connection to web420DB on MongoDB Atlas successful`);
	})
	.catch((err) => {
		console.log(`MongoDB Error: ${err.message}`);
	});

// Swagger Related info
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "WEB 420 RESTful APIs",
			version: "1.0.0",
		},
	},
	apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specification
};

// OpenAPI Specification
const openapiSpecification = swaggerJsdoc(options);

// Setting up SwaggerUI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// Setting up composerAPI middleware
app.use("/api", composerAPI);

// Setting up personAPI middleware
app.use("/api", personAPI);

// Setting up userAPI middleware
app.use("/api", userAPI);

// Creating server listening on port 3000
http.createServer(app).listen(app.get("port"), function () {
	console.log(`Application started and listening on port ${app.get("port")}`);
});
