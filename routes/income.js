/**
 * @swagger
 * tags:
 *   name: Income
 *   description: Income management
 */

/**
 * @swagger
 * /income:
 *   post:
 *     summary: Add new income
 *     tags: [Income]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - source
 *               - amount
 *             properties:
 *               source:
 *                 type: string
 *                 example: "Salary"
 *               amount:
 *                 type: number
 *                 example: 2000
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               notes:
 *                 type: string
 *                 example: "September paycheck"
 *     responses:
 *       201:
 *         description: Income added
 *   get:
 *     summary: Get all income records
 *     tags: [Income]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of income
 *
 * /income/{id}:
 *   get:
 *     summary: Get one income by id
 *     tags: [Income]
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
 *         description: Income object
 *   put:
 *     summary: Update an income record
 *     tags: [Income]
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
 *               source:
 *                 type: string
 *                 example: "Freelance"
 *               amount:
 *                 type: number
 *                 example: 500
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-05"
 *               notes:
 *                 type: string
 *                 example: "Project payment"
 *     responses:
 *       200:
 *         description: Income updated
 *   delete:
 *     summary: Delete an income record
 *     tags: [Income]
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
 *         description: Income deleted
 */


const express = require('express');
const router = express.Router();

const { isLoggedIn, validateIncome } = require('../middleware');
const Income = require('../models/income');

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

const incomeController = require('../controllers/income')

router.post('/', isLoggedIn, validateIncome, catchAsync(incomeController.newIncome));

router.get('/', isLoggedIn, catchAsync(incomeController.allIncome));

router.get('/:id', isLoggedIn, catchAsync(incomeController.oneIncome));

router.put('/:id', isLoggedIn, validateIncome, catchAsync(incomeController.editIncome));

router.delete('/:id', isLoggedIn, catchAsync(incomeController.deleteIncome));

module.exports = router;