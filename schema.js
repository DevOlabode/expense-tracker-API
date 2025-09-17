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
    date: Joi.date().default(() => new Date()),
    category: Joi.string().hex().length(24),
    description : Joi.string().allow('', null),
    paymentMethod : Joi.string().valid("Cash", "Card", "Bank Transfer", "Other").default('Cash').required(),
    recurring : Joi.boolean().default(false).required()
});

// Income schema
const incomeSchema = Joi.object({
  source: Joi.string().min(2).max(50).required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().default(() => new Date()),
  recurring : Joi.boolean().default(false),
  notes: Joi.string().allow('', null)
});

// Category schema
const categorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().allow('', null)
});

// Budget schema
const budgetSchema = Joi.object({
    name : Joi.string().required(),
    category: Joi.string().hex().length(24).allow(null),
    amount: Joi.number().positive().required(),
    period: Joi.string().valid('monthly', 'yearly').default('monthly'),
    startDate: Joi.date().default(() => new Date()),
    endDate: Joi.date()
});

module.exports = {
    userSchema,
    expenseSchema,
    incomeSchema,
    categorySchema,
    budgetSchema
};
