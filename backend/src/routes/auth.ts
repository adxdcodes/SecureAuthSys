import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  registerValidation,
  loginValidation,
  passwordChangeValidation,
  validateRequest
} from '../middleware/validation.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/register', authLimiter, registerValidation, validateRequest, register);
router.post('/login', authLimiter, loginValidation, validateRequest, login);

// Protected routes
router.use(authenticate); // Apply authentication middleware to all routes below
router.post('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', passwordChangeValidation, validateRequest, changePassword);

export default router;
