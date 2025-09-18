/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: Expense management
 */

/**
 * @swagger
 * /expense:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expense]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Netflix Subscription"
 *               amount:
 *                 type: number
 *                 example: 15.99
 *               category:
 *                 type: string
 *                 example: "Entertainment"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-17"
 *               notes:
 *                 type: string
 *                 example: "Monthly plan"
 *     responses:
 *       201:
 *         description: Expense created
 *   get:
 *     summary: Get all expenses
 *     tags: [Expense]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *
 * /expense/{id}:
 *   get:
 *     summary: Get one expense by id
 *     tags: [Expense]
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
 *         description: Expense object
 *   put:
 *     summary: Update an expense
 *     tags: [Expense]
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
 *               name:
 *                 type: string
 *                 example: "Netflix Subscription"
 *               amount:
 *                 type: number
 *                 example: 12.99
 *               category:
 *                 type: string
 *                 example: "Entertainment"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-17"
 *               notes:
 *                 type: string
 *                 example: "Updated amount"
 *     responses:
 *       200:
 *         description: Expense updated
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expense]
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
 *         description: Expense deleted
 */


const express  = require('express');
const router  = express.Router();

const { isLoggedIn, validateExpense } = require('../middleware');
const Expense = require('../models/expense')

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

const expenseController = require('../controllers/expense')

router.post('/', isLoggedIn, validateExpense, catchAsync(expenseController.newExpense));

router.get('/', isLoggedIn, catchAsync(expenseController.allExpenses));

router.get('/:id', isLoggedIn, catchAsync(expenseController.oneExpense));

router.put('/:id', isLoggedIn, validateExpense, catchAsync(expenseController.editExpense));


router.delete('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const expense = await Expense.findOneAndDelete({_id : req.params.id, user : req.user._id});
    if(!expense) return res.status(404).json({error : 'Expense Not Found'});

    res.status(200).json({msg : `The ${expense.name} was successfully deleted`})
}));

module.exports = router;