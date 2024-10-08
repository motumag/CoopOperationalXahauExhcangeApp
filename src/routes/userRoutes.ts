import express from 'express';
import { registerUser } from '../contollers/UserController';
import { validateUserRegistration } from '../validations/validation';

const router = express.Router();

// Registration route
router.post('/register',validateUserRegistration, registerUser);

export default router;
