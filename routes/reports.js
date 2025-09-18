const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

const reportController = require('../controllers/report')

// GET /reports/weekly?start=2025-09-01&end=2025-09-07
router.get('/weekly', isLoggedIn, catchAsync(reportController.weeklyReport));

// GET /reports/monthly?month=9&year=2025
router.get('/monthly', isLoggedIn, catchAsync(reportController.monthlyReport));

module.exports = router;
