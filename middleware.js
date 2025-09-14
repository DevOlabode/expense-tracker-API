const { userSchema, expenseSchema, incomeSchema, categorySchema, budgetSchema} = require('./schema')
const ExpressError = require('./utils/expressError');

module.exports.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).json({msg : 'You must be logged in!'})
    }
    next();
};

module.exports.validateUser  = (req, res, next)=>{
    const { error } = userSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};

module.exports.validateExpense  = (req, res, next)=>{
    const { error } = expenseSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};

module.exports.validateIncome  = (req, res, next)=>{
    const { error } = incomeSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};

module.exports.validateCategory  = (req, res, next)=>{
    const { error } = categorySchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};

module.exports.validateBudget  = (req, res, next)=>{
    const { error } = budgetSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};