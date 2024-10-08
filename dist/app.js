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
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dbConfig_1 = require("./config/dbConfig");
const app = (0, express_1.default)();
// Middleware for parsing JSON
app.use(express_1.default.json());
// DB connection and migration part
(0, dbConfig_1.connectDB)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database connection established.');
    yield dbConfig_1.sequelize.sync({ alter: true }); // Use `alter: true` for migrations
    // await sequelize.sync({ force: true }); 
    console.log('All models were synchronized successfully.');
})).catch((error) => {
    console.error('Database connection failed:', error);
});
// user routes 
app.use('/api/users', userRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
