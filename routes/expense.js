const express  = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../middleware');
const Expense = require('../models/expense')

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

router.post('/', isLoggedIn, catchAsync(async(req, res)=>{
    const expense = new Expense({
        ...req.body,
        user : req.user._id
    });
    await expense.save();
    res.status(200).json({msg : 'Expense Created Successfully', expense})
}));

router.get('/', isLoggedIn, catchAsync(async(req, res)=>{
    const expenses  = await Expense.find({user : req.user._id});
    if(!expenses) return res.status(500).json({msg : 'Expenses cannot be fetched'})
    
    res.status(200).json({msg : 'All Expenses', expenses})    
}));

router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const expense  = await Expense.findOne({_id : req.params.id, user : req.user._id});

    if(!expense) return res.status(404).json({msg : 'Expense Not Found'});

    res.status(200).json(expense)
}));

router.put('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const expense = await Expense.findByIdAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    }
);

    if(!expense) return res.status(404).json({msg : 'Expense Not Found'});

    res.status(200).json({msg : 'Expense Edited Successfully', expense})
}));


router.delete('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const expense = await Expense.findByIdAndDelete({_id : req.params.id, user : req.user._id});
    if(!expense) return res.status(404).json({msg : 'Expense Not Found'});

    res.status(200).json({msg : `The ${expense.name} was successfully deleted`})
}));

module.exports = router;