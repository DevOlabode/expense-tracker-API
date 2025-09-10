const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : user,
        type : true
    },
    amount : {
        type : Number,
        required : true,
        min : [0, 'Amount must be positive']
    },
    category : {
        type : String,
        required : true,
        enum : [
        "Food",
        "Transport",
        "Entertainment",
        "Bills",
        "Shopping",
        "Healthcare",
        "Education",
        "Other",
        ]
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
      default: false, // for subscriptions (Netflix, Rent, etc.)
    },
},
    {timestamps :true}
)

module.exports = mongoose.model('expense', expenseSchema)