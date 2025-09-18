/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Expense categories
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Food"
 *               description:
 *                 type: string
 *                 example: "Groceries and dining"
 *     responses:
 *       201:
 *         description: Category created
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *
 * /category/{id}:
 *   get:
 *     summary: Get one category by id
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category object
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Transport"
 *               description:
 *                 type: string
 *                 example: "Bus, taxi, rideshare"
 *     responses:
 *       200:
 *         description: Category updated
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */


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