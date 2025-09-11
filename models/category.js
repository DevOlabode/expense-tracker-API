const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 50
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    type : {
        type : String,
        enum : ['Expense', 'Income'],
        default : 'Expense'
    }
},
{ timestamps : true}
);

module.exports = mongoose.model('category', categorySchema)