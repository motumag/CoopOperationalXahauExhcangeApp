"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloController_1 = require("../contollers/helloController");
const helloValidation_1 = __importDefault(require("../validations/helloValidation"));
const router = (0, express_1.Router)();
router.get('/hello', helloValidation_1.default, helloController_1.sayHello);
router.get('/hiMan', helloController_1.sayHiMan);
exports.default = router;
