const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    resetPasswordToken : {
        type : String
    },
    resetPassswordExpires : {
        type : Date
    }
});

userSchema.plugin(passportLocalMongoose);

// userSchema.methods.generatePasswordReset = function() {
//   const resetToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   this.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 minutes
//   return resetToken; // send un-hashed to user
// };

module.exports = mongoose.model('User', userSchema);