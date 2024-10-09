"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForexRateCreation = exports.validateUserLogin = exports.validateUserRegistration = void 0;
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
const validateForexRateCreation = (req, res, next) => {
    const { mid_rate, buy_rate, sell_rate } = req.body;
    if (!mid_rate || !buy_rate || !sell_rate) {
        res.status(400).json({
            message: 'All fields are required: mid_rate, buy_rate, sell_rate',
        });
        return;
    }
    next();
};
exports.validateForexRateCreation = validateForexRateCreation;
// Validation middleware for creating Forex rate
// export const validateForexRateCreation = (req: Request, res: Response, next: NextFunction): void => {
//   const { mid_rate, buy_rate, sell_rate } = req.body;
//   if (!mid_rate || !buy_rate || !sell_rate) {
//     return res.status(400).json({
//       message: 'All fields are required: mid_rate, buy_rate, sell_rate',
//     });
//   }
//   next();
// };
