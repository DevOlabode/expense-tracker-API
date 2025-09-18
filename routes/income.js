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