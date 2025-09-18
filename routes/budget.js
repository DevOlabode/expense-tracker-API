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