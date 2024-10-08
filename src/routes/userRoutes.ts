import express from 'express';
import { registerUser ,loginUser,getAllUsers} from '../contollers/UserController';
import { validateUserRegistration ,validateUserLogin} from '../validations/validation';
import {authenticateJWT} from '../middlewares/jwtAuthentication';

const router = express.Router();

// Registration route
router.post('/register',validateUserRegistration, registerUser);
// Login route
router.post('/login', validateUserLogin, loginUser);
router.get('/getAllUsers', authenticateJWT, getAllUsers);




export default router;
