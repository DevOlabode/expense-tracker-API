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

router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const income = await Income.findOne({ _id : req.params.id, user : req.user._id});

    if(!income) return res.status(404).json({error : 'Income Not Found.'});

    res.status(200).json(income);
}));

router.put('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const income = await Income.findOneAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    }
);
    if(!income) return res.status(404).json({error : 'Income Not Found'});

    res.status(200).json({msg : 'Income Updated Successfully', income})

}));

router.delete('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const income = await Income.findOneAndDelete({ _id : req.params.id, user : req.user._id});

    if(!income) return res.status(404).json({error : 'Income Not Found'});

    res.status(200).json({msg : `The ${income.source} income was deleted`})
}));

module.exports = router;