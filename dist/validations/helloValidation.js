"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (req, res, next) => {
    if (!req.query.name) {
        // Return here to ensure the request-response cycle is completed and response is sent
        res.status(400).json({ message: "Missing query parameter: name" });
    }
    else {
        next();
    }
};
exports.default = validateRequest;
