const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetschema = new Schema({
    name : {
        type : String, 
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    category :  {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : false    
    },
    amount : {
        type : Number,
        required : true,
        min : 0
    },
    period : {
        type : String, 
        enum : ['monthly', 'yearly'],
        default : 'monthly'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
},
    {timestamps : true}
);

module.exports = mongoose.model('Budget', budgetschema);