const Joi = require('joi');

// User schema (for signup/update)
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).pattern(new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])'))
  .required()
});

// Expense schema
const expenseSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required(),
    category: Joi.string().hex().length(24).required(), // ObjectId as string
    notes: Joi.string().allow('', null)
});

// Income schema
const incomeSchema = Joi.object({
    source: Joi.string().min(2).max(50).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required(),
    notes: Joi.string().allow('', null)
});

// Category schema
const categorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().allow('', null)
});

// Budget schema
const budgetSchema = Joi.object({
    category: Joi.string().hex().length(24).allow(null), // optional
    amount: Joi.number().positive().required(),
    period: Joi.string().valid('monthly', 'yearly').default('monthly'),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
});

module.exports = {
    userSchema,
    expenseSchema,
    incomeSchema,
    categorySchema,
    budgetSchema
};
