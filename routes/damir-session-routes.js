/**
 * Title: damir-composer-routes.js
 * Date: November 26, 2022
 * Author: Jamal Eddine Damir
 * Description: File containing the routes for sign-up and login APIs
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

//Requiring Modules
const express = require("express");
const router = express.Router();
const User = require("../models/damir-user");
const bcrypt = require("bcryptjs");

// Assigning hashing rounds to saltRounds variable
const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - signup
 *     name: signup
 *     summary: Signs up a new user
 *     description: API for new user signup
 *     requestBody:
 *       description: User Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
	try {
		User.findOne({ userName: req.body.userName }, function (err, user) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else if (!user) {
				const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
				const newUser = {
					userName: req.body.userName,
					password: hashedPassword,
					emailAddress: req.body.emailAddress,
				};
				User.create(newUser, function (err, user) {
					if (err) {
						console.log(err);
						res.status(501).send({
							message: `MongoDB Exception: ${err}`,
						});
					} else {
						console.log(user);
						res.json(user);
					}
				});
			} else {
				res.status(401).send({
					message: "Username is already in use",
				});
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - login
 *     name: login
 *     summary: Allows a user to login
 *     description: API for user login
 *     requestBody:
 *       description: User Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
	try {
		User.findOne({ userName: req.body.userName }, function (err, user) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				if (user) {
					let passwordIsValid = bcrypt.compareSync(
						req.body.password,
						user.password
					);

					if (passwordIsValid) {
						console.log("Password matches");
						res.status(200).send({
							message: "Password matches",
						});
					} else {
						console.log("Password is incorrect");
						res.status(401).send({
							message: `Invalid passId or password`,
						});
					}
				} else {
					console.log("Invalid passId");
					res.status(401).send({
						message: `Invalid passId or password`,
					});
				}
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e}`,
		});
	}
});

module.exports = router;
