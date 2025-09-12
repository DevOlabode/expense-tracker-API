const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeSchema = new Schema({
    user :{ 
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    source : {
        type : String,
        required : true,
        trim : true,
        maxlength : 100
    },
    amount : {
        type : Number,
        required : true,
        min : [ 0, 'Income must be positive']
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    },
    recurring : {
        type : Boolean,
        default : false //monthly Salary
    }, 
    notes : {
        type : String,
        trim : true,
        maxlength : 200
    }
},
    {timestamps : true}
);

module.exports = mongoose.model('Income', incomeSchema)