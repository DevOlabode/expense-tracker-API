const Expense = require('../models/expense')

module.exports.newExpense = async(req, res)=>{
    const expense = new Expense({
        ...req.body,
        user : req.user._id
    });
    await expense.save();
    res.status(200).json({msg : 'Expense Created Successfully', expense})
};

module.exports.allExpenses = async(req, res)=>{
    const expenses  = await Expense.find({user : req.user._id});
    if(!expenses) return res.status(404).json({error : 'No Expenses Found'})
    
    res.status(200).json({msg : 'All Expenses', expenses})    
};

module.exports.oneExpense = async(req, res)=>{
    const expense  = await Expense.findOne({_id : req.params.id, user : req.user._id});

    if(!expense) return res.status(404).json({error : 'Expense Not Found'});

    res.status(200).json(expense)
};

module.exports.editExpense = async(req, res)=>{
    const expense = await Expense.findOneAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    }
);

    if(!expense) return res.status(404).json({error : 'Expense Not Found'});

    res.status(200).json({msg : 'Expense Edited Successfully', expense})
}