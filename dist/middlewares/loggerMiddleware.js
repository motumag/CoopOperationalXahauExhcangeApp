"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log(`${req.body}`);
    next();
};
exports.default = loggerMiddleware;
