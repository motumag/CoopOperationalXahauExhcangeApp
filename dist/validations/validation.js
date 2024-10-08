"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegistration = void 0;
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
