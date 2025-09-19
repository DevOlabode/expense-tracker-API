/**
 * @swagger
 * /api/reports/weekly:
 *   get:
 *     summary: Get weekly financial report
 *     description: Returns total income, total expenses, balance, expenses grouped by category, and budget comparison for a given week.
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date of the report range (YYYY-MM-DD).
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date of the report range (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Weekly report generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 week:
 *                   type: object
 *                   properties:
 *                     start: { type: string }
 *                     end: { type: string }
 *                 totalIncome: { type: number }
 *                 totalExpenses: { type: number }
 *                 balance: { type: number }
 *                 expensesByCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category: { type: string }
 *                       total: { type: number }
 *                 budgetComparison:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category: { type: string }
 *                       budget: { type: number }
 *                       spent: { type: number }
 *                       remaining: { type: number }
 *                       percentageUsed: { type: string }
 *       400:
 *         description: Missing start or end date.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Get monthly financial report
 *     description: Returns total income, total expenses, balance, expenses grouped by category, and budget comparison for a given month.
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: Month number (1–12).
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year (e.g. 2025).
 *     responses:
 *       200:
 *         description: Monthly report generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 month: { type: integer }
 *                 year: { type: integer }
 *                 totalIncome: { type: number }
 *                 totalExpenses: { type: number }
 *                 balance: { type: number }
 *                 expensesByCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category: { type: string }
 *                       total: { type: number }
 *                 budgetComparison:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category: { type: string }
 *                       budget: { type: number }
 *                       spent: { type: number }
 *                       remaining: { type: number }
 *                       percentageUsed: { type: string }
 *       400:
 *         description: Missing month or year.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /reports/AI-report:
 *   get:
 *     summary: Generate AI-powered financial insights
 *     description: Returns an AI-generated analysis of the user's income, expenses, and budgets.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: AI report generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg: { type: string }
 *                 report: { type: string }
 *       500:
 *         description: Internal server error.
 */


const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

const reportController = require('../controllers/report')

// GET /reports/weekly?start=2025-09-01&end=2025-09-07
router.get('/weekly', isLoggedIn, catchAsync(reportController.weeklyReport));

// GET /reports/monthly?month=9&year=2025
router.get('/monthly', isLoggedIn, catchAsync(reportController.monthlyReport));

router.get('/AI-report', isLoggedIn, catchAsync(reportController.AIReport))

module.exports = router;
