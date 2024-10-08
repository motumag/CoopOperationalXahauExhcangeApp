"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserRegistration = void 0;
const validateUserRegistration = (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
        res.status(400).json({
            message: 'All fields are required: firstName, lastName, username, email',
        });
        return;
    }
    next();
};
exports.validateUserRegistration = validateUserRegistration;
// Validate the user login request
const validateUserLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: 'Both email and password are required',
        });
        return;
    }
    next();
};
exports.validateUserLogin = validateUserLogin;
