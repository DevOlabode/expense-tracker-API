const express  = require('express');
const router = express.Router();
const passport = require('passport');

const nodemailer = require('nodemailer');

const crypto = require('crypto');

const User = require('../models/user');

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const { sendPasswordResetCode } = require('../utils/emailService');

const { isLoggedIn, validateUser } = require('../middleware');

router.post('/register', validateUser,  catchAsync(async(req, res)=>{
    const {username, email, password} = req.body;
    const user = await User.register(new User({ username, email }), password);
    await user.save();

    res.status(201).json({msg : 'User registered successfully'});
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.status(401).json({ msg: info.message || 'Login failed' });
    }

    if(req.user){
        return res.status(401).json({msg : "Already Logged In"})
    }

    req.logIn(user, (err) => {
        if (err) {
            return next(err)
        }
            return res.status(200).json({ msg: 'Logged in successfully' });
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, catchAsync(async(req, res)=>{
    req.logout(function(err){
        if(err) return next(err)
        req.session.destroy(()=>{
        res.status(201).json({msg : 'Logged out successfully'})
    })
    })
}));

router.get('/profile', isLoggedIn, catchAsync(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(!user) throw new ExpressError('User not found', 404);
    res.status(200).json(user)
}));

router.delete('/delete', isLoggedIn, catchAsync(async(req, res)=>{
    const user = await User.findByIdAndDelete(req.user._id);
    if(!user) throw new ExpressError('User not found', 404);
    res.status(200).json({msg : 'Account Deleted Successfully'})
}));

//Forgotten Password or reset password.

function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');

  const hash = crypto.createHash('sha512')
    .update(salt + password)
    .digest('hex');

  return { salt, hash };
};

router.post('/forgot-password', catchAsync(async(req, res)=>{
    const user = await User.findOne({email : req.body.email });
    if(!user) return res.status(404).json({error : 'No Account Found With This Emial'});
}));


module.exports = router;