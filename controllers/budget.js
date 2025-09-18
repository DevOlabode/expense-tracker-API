const Budget = require('../models/budget');

module.exports.newBudget = async(req, res)=>{
    const budget = new Budget({
        ... req.body,
        user : req.user._id
    });
    await budget.save();
    res.status(200).json({msg : 'Budget Created Successfully', budget})
};

module.exports.allBudget = async(req, res)=>{
    const budget = await Budget.find({user : req.user._id});

    if(!budget || budget.length === 0) return res.status(404).json({error : 'Budget Not Found'});

    res.status(200).json({msg : 'All Budgets', budget});
};

module.exports.oneBudget = async(req, res)=>{
    const budget = await Budget.findOne({ _id : req.params.id, user : req.user._id});

    if(!budget) return res.status(404).json({error : 'Budget Not Found.'});

    res.status(200).json(budget);
};

module.exports.editBudget = async(req, res)=>{
    const budget = await Budget.findOneAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    }
);
    if(!budget) return res.status(404).json({error : 'Budget Not Found'});

    res.status(200).json({msg : 'Budget Updated Successfully', budget})

};

module.exports.deleteBudget = async(req, res)=>{
    const budget = await Budget.findOneAndDelete({ _id : req.params.id, user : req.user._id});

    if(!budget) return res.status(404).json({error : 'Budget Not Found'});

    res.status(200).json({msg : `The ${budget.name} budget was deleted`})
};