import express from 'express';
import { registerUser ,loginUser} from '../contollers/UserController';
import { validateUserRegistration ,validateUserLogin} from '../validations/validation';

const router = express.Router();

// Registration route
router.post('/register',validateUserRegistration, registerUser);
// Login route
router.post('/login', validateUserLogin, loginUser);


export default router;
