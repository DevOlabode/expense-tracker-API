const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    name : {
      type : String,
      required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    amount : {
        type : Number,
        required : true,
        min : [0, 'Amount must be positive']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false 
  },
    description : {
        type : String,
        trim : true,
        maxlength : 200
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Bank Transfer", "Other"],
      default: "Cash",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    recurring: {
      type: Boolean,
      default: false, 
    },
},
    {timestamps :true}
)

module.exports = mongoose.model('expense', expenseSchema);