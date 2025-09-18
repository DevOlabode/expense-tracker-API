/**
 * @swagger
 * tags:
 *   name: Budget
 *   description: Budget management
 */

/**
 * @swagger
 * /budget:
 *   post:
 *     summary: Create a new budget
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               category:
 *                 type: string
 *                 example: "Groceries"
 *     responses:
 *       201:
 *         description: Budget created successfully
 *   get:
 *     summary: Get all budgets
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of budgets
 *
 * /budget/{id}:
 *   get:
 *     summary: Get one budget by id
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget object
 *   put:
 *     summary: Update a budget
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 600
 *               category:
 *                 type: string
 *                 example: "Utilities"
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *   delete:
 *     summary: Delete a budget
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget deleted successfully
 */


const express = require('express');
const router = express.Router();

const { isLoggedIn, validateBudget } = require('../middleware');

const catchAsync = require('../utils/catchAsync');

const budgetController = require('../controllers/budget');

// router.post('/', isLoggedIn, validateBudget, catchAsync(budgetController.newBudget));

router.route('/')
    .post(isLoggedIn, validateBudget, catchAsync(budgetController.newBudget))
    .get(isLoggedIn, catchAsync(budgetController.allBudget))

// router.get('/', isLoggedIn, catchAsync(budgetController.allBudget));

router.get('/:id', isLoggedIn, catchAsync(budgetController.oneBudget));

router.put('/:id', isLoggedIn, validateBudget, catchAsync(budgetController.editBudget));

router.delete('/:id', isLoggedIn, catchAsync(budgetController.deleteBudget));

module.exports = router;