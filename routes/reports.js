const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const Expense = require('../models/expense');
const Income = require('../models/income');
const Budget = require('../models/budget');
const catchAsync = require('../utils/catchAsync');

// GET /reports/weekly?start=2025-09-01&end=2025-09-07
router.get('/weekly', isLoggedIn, catchAsync(async (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Start and end dates are required (YYYY-MM-DD)" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); // include full day

    // 1️⃣ Total Income for the week
    const totalIncomeAgg = await Income.aggregate([
        { $match: { user: req.user._id, date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.totalIncome || 0;

    // 2️⃣ Expenses grouped by category
    const expensesAgg = await Expense.aggregate([
        { $match: { user: req.user._id, date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryDetails" } },
        { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
        { $project: { category: "$categoryDetails.name", total: 1 } }
    ]);

    const totalExpenses = expensesAgg.reduce((acc, curr) => acc + curr.total, 0);

    // 3️⃣ Compare with active budgets
    const budgets = await Budget.find({
        user: req.user._id,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
    }).populate('category');

    const budgetComparison = budgets.map(budget => {
        const spent = expensesAgg.find(e => e.category === budget.category?.name)?.total || 0;
        return {
            category: budget.category?.name || "General",
            budget: budget.amount,
            spent,
            remaining: budget.amount - spent,
            percentageUsed: ((spent / budget.amount) * 100).toFixed(2)
        };
    });

    res.status(200).json({
        week: { start, end },
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        expensesByCategory: expensesAgg,
        budgetComparison
    });
}));

// GET /reports/monthly?month=9&year=2025
router.get('/monthly', isLoggedIn, catchAsync(async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) return res.status(400).json({ error: "Month and year are required" });

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // 1️⃣ Total Income for the month
    const totalIncomeAgg = await Income.aggregate([
        { $match: { user: req.user._id, date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.totalIncome || 0;

    // 2️⃣ Total Expenses for the month
    const totalExpensesAgg = await Expense.aggregate([
        { $match: { user: req.user._id, date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryDetails" } },
        { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
        { $project: { category: "$categoryDetails.name", total: 1 } }
    ]);

    const totalExpenses = totalExpensesAgg.reduce((acc, curr) => acc + curr.total, 0);

    // 3️⃣ Budget comparison
    const budgets = await Budget.find({
        user: req.user._id,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
    }).populate('category');

    const budgetComparison = budgets.map(budget => {
        // Find total expenses for this budget’s category
        const spent = totalExpensesAgg.find(e => e.category === budget.category?.name)?.total || 0;
        return {
            category: budget.category?.name || "General",
            budget: budget.amount,
            spent,
            remaining: budget.amount - spent,
            percentageUsed: ((spent / budget.amount) * 100).toFixed(2)
        };
    });

    res.status(200).json({
        month,
        year,
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        expensesByCategory: totalExpensesAgg,
        budgetComparison
    });
}));

module.exports = router;
