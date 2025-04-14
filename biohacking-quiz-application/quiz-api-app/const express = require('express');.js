const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ...existing code...

const server = app.listen(PORT, () => {
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