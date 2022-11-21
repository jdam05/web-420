/**
 * Title: damir-composer-routes.js
 * Date: November 19, 2022
 * Author: Jamal Eddine Damir
 * Description: File containing the routes for the composers API
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

//Requiring Modules
const express = require("express");
const router = express.Router();
const Composer = require("../models/damir-composer");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an list of composers from MongoDB Atlas.
 *     summary: returns a list of composer documents.
 *     responses:
 *       "200":
 *         description: Composer documents
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.get("/composers", async (req, res) => {
	try {
		Composer.find({}, function (err, composers) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composers);
				res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *    get:
 *     tags:
 *       - Composers
 *     description: API for returning a single composer object from MongoDB
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The composerId requested by the user
 *         schema:
 *           type: string
 *    responses:
 *      "200":
 *        description: Composer document is JSON format
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/composers/:id", async (req, res) => {
	try {
		// prettier-ignore
		Composer.findOne({"_id": req.params.id}, function (err, composer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composer);
				res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composers:
 *    post:
 *      tags:
 *        - Composers
 *      name: Create Composer
 *      description: API for adding new composer objects.
 *      summary: Creates a new composer object.
 *      requestBody:
 *        description: Composer information.
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - firstName
 *                - lastName
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Composer added
 *        "500":
 *          description: Server Exception
 *        "501":
 *          description: MongoDB Exception */
router.post("/composers", async (req, res) => {
	try {
		const newComposer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		};

		await Composer.create(newComposer, function (err, composer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composer);
				res.json(composer);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});

module.exports = router;
