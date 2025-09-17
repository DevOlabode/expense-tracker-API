const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 50
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type : {
        type : String,
        enum : ['Expense', 'Income'],
        default : 'Expense'
    },
    description : {
        type : String,
        required : false
    }
},
{ timestamps : true}
);

module.exports = mongoose.model('category', categorySchema)