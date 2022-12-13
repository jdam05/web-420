/**
 * Title: damir-teams-routes.js
 * Date: December 12, 2022
 * Author: Jamal Eddine Damir
 * Description: File containing the routes for the Teams API
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

//Requiring Modules
const express = require("express");
const router = express.Router();
const Team = require("../models/damir-team");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an list of teams from MongoDB Atlas.
 *     summary: returns a list of team documents.
 *     responses:
 *       "200":
 *         description: Array of team documents
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.get("/teams", async (req, res) => {
	try {
		Team.find({}, function (err, teams) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(teams);
				res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Assigns player to team
 *     description: API for adding new player objects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
	try {
		// prettier-ignore
		Team.findOne({"_id": req.params.id}, function (err, team) {

			const newPlayer = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				salary: req.body.salary,
			};
		if (err) {
			console.log(err);
			res.status(501).send({
				message: `MongoDB Exception: ${err}`,
			});
		} else {
			console.log(team);
			team.players.push(newPlayer);
			team.save(function (err, addedPlayer) {
				if (err) {
					console.log(err);
				} else {
					console.log(addedPlayer);
					res.json(addedPlayer);
				}
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
 * findAllPlayerByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *    get:
 *     tags:
 *       - Teams
 *     name: findAllPlayersByTeamId
 *     description: API for returning a list of players by TeamId
 *     summary: returns a list of player documents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The teamId requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Array of player documents
 *       "401":
 *         description: Invalid teamId
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.get("/teams/:id/players", async (req, res) => {
	try {
		// prettier-ignore
		Team.findOne({"_id": req.params.id}, function (err, player) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(player);
				res.json(player);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting team object from MongoDB
 *     summary: Deletes a team document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The teamId to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Team document
 *       "401":
 *         description: Invalid teamId
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */

router.delete("/teams/:id", async (req, res) => {
	try {
		// prettier-ignore
		Team.findOneAndDelete({"_id": req.params.id}, function (err, team) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(team);
				res.json(team);
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
