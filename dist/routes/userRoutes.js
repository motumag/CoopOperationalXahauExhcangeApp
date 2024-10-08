"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../contollers/UserController");
const validation_1 = require("../validations/validation");
const router = express_1.default.Router();
// Registration route
router.post('/register', validation_1.validateUserRegistration, UserController_1.registerUser);
exports.default = router;
