const User = require('../models/user');

const { sendPasswordResetCode } = require('../utils/emailService');

const generateResetCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

module.exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    const resetCode = generateResetCode();
    const resetExpiry = Date.now() + 15 * 60 * 1000; 

    user.resetPasswordToken = resetCode;
    user.resetPassswordExpires = resetExpiry; 
    
    await user.save();

    const emailResult = await sendPasswordResetCode(email, resetCode);

    if (!emailResult.success) {
      user.resetPasswordToken = undefined;
      user.resetPassswordExpires = undefined;
      await user.save();
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send reset code. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to your email address',
      expiresIn: '15 minutes'
    });
};

module.exports.verifyResetCode = async (req, res) => {
    const { email, resetCode } = req.body;

    if (!email || !resetCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and reset code are required'
      });
    }

    const user = await User.findOne({
      email,
      resetPasswordToken: resetCode,
      resetPassswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reset code verified successfully. You can now set your new password.',
      userId: user._id
    });
};

module.exports.verifyNewPassword = async(req, res)=>{
    const { newPassword, email } = req.body;

    if(!newPassword) return res.status(400).json({error : 'New Password is required'});

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({error : 'No User With That Email'});

    await user.setPassword(newPassword);

    user.resetPasswordToken = undefined;
    user.resetPassswordExpires = undefined;
    
    await user.save();

    res.status(200).json({msg : 'Password Reset Successfully. You can now login with your new password '})
};

module.exports.resetPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "New Password and confirm password should be the same" });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: "Current password should not equal new password" });
  }

  user.changePassword(currentPassword, newPassword, (err) => {
    if (err) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }
    res.json({ message: "Password updated successfully." });
  });
};
