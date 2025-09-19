/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Generate reports
 */

/**
 * @swagger
 * /reports/weekly:
 *   get:
 *     summary: Generate a weekly report
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           example: 2025-09-01
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           example: 2025-09-07
 *     responses:
 *       200:
 *         description: Weekly report generated
 *
 * /reports/monthly:
 *   get:
 *     summary: Generate a monthly report
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           example: 9
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Monthly report generated
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
