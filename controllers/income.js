const Income = require('../models/income');

module.exports.newIncome = async(req, res)=>{
    const income = new Income({
        ... req.body,
        user : req.user._id
    });
    await income.save();
    res.status(200).json({msg : 'Income Created Successfully', income})
};

module.exports.allIncome = async(req, res)=>{
    const income = await Income.find({user : req.user._id});

    if(!income || income.length === 0) return res.status(404).json({error : 'Income Not Found'});

    res.status(200).json({msg : 'All Income', income});
};

module.exports.oneIncome = async(req, res)=>{
    const income = await Income.findOne({ _id : req.params.id, user : req.user._id});

    if(!income) return res.status(404).json({error : 'Income Not Found.'});

    res.status(200).json(income);
};

module.exports.editIncome = async(req, res)=>{
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

};

module.exports.deleteIncome = async(req, res)=>{
    const income = await Income.findOneAndDelete({ _id : req.params.id, user : req.user._id});

    if(!income) return res.status(404).json({error : 'Income Not Found'});

    res.status(200).json({msg : `The ${income.source} income was deleted`})
};