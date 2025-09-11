const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const Category = require('../models/category')

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

router.post('/', isLoggedIn, catchAsync(async(req, res)=>{
    const category = new Category({
        ...req.body,
        user : req.user._id
    });

    await category.save();
    res.status(200).json({msg : 'Created New Category Successfully', category});
}));

module.exports = router;