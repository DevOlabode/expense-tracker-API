const express  = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../middleware');
const Expense = require('../models/expense')

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

router.post('/', catchAsync(async(req, res)=>{
    const expense = new Expense({
        ...req.body,
        user : req.user._id
    });
    res.status(200).json({msg : 'Expense Created Successfully', expense})
}));

module.exports = router;