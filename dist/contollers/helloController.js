"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHiMan = exports.sayHello = void 0;
const errorHandler_1 = require("../middlewares/errorHandler");
const sayHello = (req, res, next) => {
    try {
        const name = req.query.name;
        if (!name) {
            throw new errorHandler_1.AppError('Name query parameter is required', 400);
        }
        res.status(200).json({ message: `Hello, ${name}!` });
    }
    catch (error) {
        next(error);
    }
};
exports.sayHello = sayHello;
const sayHiMan = (req, res, next) => {
    try {
        res.status(200).json({ message: 'Hi man!' });
    }
    catch (error) {
        next(error);
    }
};
exports.sayHiMan = sayHiMan;
