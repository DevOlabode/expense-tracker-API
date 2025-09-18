const express = require('express');
const router = express.Router();

const { isLoggedIn, validateCategory } = require('../middleware');
const Category = require('../models/category')

const catchAsync = require('../utils/catchAsync');
const expressError  = require('../utils/expressError');

const categoryController = require('../controllers/category')

router.post('/', isLoggedIn, validateCategory, catchAsync(categoryController.newCategory));

router.get('/', isLoggedIn, catchAsync(categoryController.allCategories));

router.get('/:id', isLoggedIn, catchAsync(categoryController.oneCategory));

router.put('/:id', isLoggedIn, validateCategory, catchAsync(categoryController.editCategory));

router.delete('/:id', isLoggedIn, catchAsync(categoryController.deleteCategory));

module.exports = router