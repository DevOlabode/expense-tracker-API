/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */

const express  = require('express');
const router = express.Router();

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const authController = require('../controllers/authController')


const { isLoggedIn, validateUser } = require('../middleware');

router.post('/register', validateUser,  catchAsync(authController.register));

router.post('/login', authController.login);

router.post('/logout', isLoggedIn, catchAsync(authController.logout));

router.get('/profile', isLoggedIn, catchAsync(authController.profile));

router.delete('/delete', isLoggedIn, catchAsync(authController.deleteAcct));

//Forgotten Password.

router.post('/forgot-password', catchAsync(authController.requestPasswordReset));

router.post('/verify-reset-code', catchAsync(authController.verifyResetCode));

router.post('/new-password', catchAsync(authController.verifyNewPassword));

//  or reset password
router.post('/reset-password', isLoggedIn, catchAsync(authController.resetPassword));

module.exports = router;