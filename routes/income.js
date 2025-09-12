const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const Income = require('../models/income');
const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

router.post('/', isLoggedIn, catchAsync(async(req, res)=>{
    const income = new Income({
        ... req.body,
        user : req.user._id
    });
    await income.save();
    res.status(200).json({msg : 'Income Created Successfully', income})
}));

router.get('/', isLoggedIn, catchAsync(async(req, res)=>{
    const income = await Income.find({user : req.user._id});

    if(!income || income.length === 0) return res.status(404).json({error : 'Income Not Found'});

    res.status(200).json({msg : 'All Income', income});
}));

router.put('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const income = await Income.findOne({ _id : req.params.id, user : req.user._id});

    if(!income) return res.status(404).json({msg : 'Income Not Found.'});

    
}))

module.exports = router;