import express from 'express';
import bodyParser from 'body-parser';
import { setRoutes } from './routes/quizRoutes';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Set up routes
setRoutes(app);

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