/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: samuel
 *               email:
 *                 type: string
 *                 example: samuel@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *
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
 *                 example: samuel@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *
 * /logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *
 * /profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *
 * /delete:
 *   delete:
 *     summary: Delete current user account
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User account deleted
 *
 * /forgot-password:
 *   post:
 *     summary: Request a password reset code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: samuel@example.com
 *     responses:
 *       200:
 *         description: Password reset code sent
 *
 * /verify-reset-code:
 *   post:
 *     summary: Verify password reset code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - resetCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: samuel@example.com
 *               resetCode:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Reset code verified
 *
 * /new-password:
 *   post:
 *     summary: Set a new password after verification
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: samuel@example.com
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *
 * /reset-password:
 *   post:
 *     summary: Reset password while logged in
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: Password123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
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