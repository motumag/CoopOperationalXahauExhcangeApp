"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        // Create a new user instance
        const user = new User_1.default();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        // hash the password
        yield user.setPassword(password);
        yield user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'No user found with this email' });
            return;
        }
        // Validate the password
        const isPasswordValid = yield user.validatePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || '2371974832747978374', {
            expiresIn: '1h',
        });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
