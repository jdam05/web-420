/**
 * Title: damir-node-shopper-routes.js
 * Date: November 30, 2022
 * Author: Jamal Eddine Damir
 * Description: File containing the routes for customers' API
 * Sources:
 * Source code from class GitHub Repository
 * Instructor provided assignment specific instructions
 */

//Requiring Modules
const express = require("express");
const router = express.Router();
const Customer = require("../models/damir-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: Create Customer
 *     summary: Creates a new customer
 *     description: API for adding new customers objects
 *     requestBody:
 *       description: Customer Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
	try {
		const newCustomer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
		};

		await Customer.create(newCustomer, function (err, customer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(customer);
				res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Creates a new invoice by userName
 *     description: API for adding new invoice objects
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username to assign invoice to
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItem:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Invoice added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers/:userName/invoices", async (req, res) => {
	try {
		// prettier-ignore
		Customer.findOne({"userName": req.params.userName}, function (err, customer) {

			const newInvoice = {
				subtotal: req.body.subtotal,
				tax: req.body.tax,
				dateCreated: req.body.dateCreated,
				dateShipped: req.body.dateShipped,
				lineItem: req.body.lineItem,
			};
		if (err) {
			console.log(err);
			res.status(501).send({
				message: `MongoDB Exception: ${err}`,
			});
		} else {
			console.log(customer);
			customer.invoices.push(newInvoice);
			customer.save(function (err, addedInvoice) {
				if (err) {
					console.log(err);
				} else {
					console.log(addedInvoice);
					res.json(addedInvoice);
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
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *    get:
 *     tags:
 *       - Customers
 *     description: API for finding all invoices by username
 *     summary: returns invoices document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username requested by the user
 *         schema:
 *           type: string
 *    responses:
 *      "200":
 *        description: Customer document is JSON format
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/customers/:userName/invoices", async (req, res) => {
	try {
		// prettier-ignore
		Customer.findOne({"userName": req.params.userName}, function (err, customer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(customer);
				res.json(customer.invoices);
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
