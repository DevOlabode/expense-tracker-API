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