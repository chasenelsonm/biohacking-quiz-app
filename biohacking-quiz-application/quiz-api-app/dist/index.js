"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const quizRoutes_1 = require("./routes/quizRoutes");
require('dotenv').config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = parseInt(process.env.PORT || "3000", 10);
// Middleware
app.use(body_parser_1.default.json());
// Set up routes
(0, quizRoutes_1.setRoutes)(app);
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Quiz API is running on http://localhost:${PORT}`);
});
// Handle termination signals to release the port
const shutdown = () => {
    server.close(() => {
        console.log('Server closed gracefully.');
        process.exit(0);
    });
};
process.on('SIGINT', shutdown); // Handle Ctrl+C
process.on('SIGTERM', shutdown); // Handle termination signals
