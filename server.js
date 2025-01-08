const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// SSE endpoint for sending messages
app.get('/events', (req, res) => {
    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Function to send messages
    const sendEvent = () => {
        const message = "Drag and drop the images to spots on the map!";
        res.write(`data: ${message}\n\n`);
    };

    // Send the first event after 30 seconds
    setTimeout(() => {
        sendEvent(); // Send the first message

        // Send subsequent messages every 30 seconds
        const intervalId = setInterval(() => {
            sendEvent();
        }, 30000); // Every 30 seconds

        // Clear interval when the connection is closed
        req.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    }, 30000); // Initial delay of 30 seconds
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
