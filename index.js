const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow specific origins or all if origin is not restrictive
            const allowedOrigins = ['*'];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // Set this to true if cookies or credentials are needed
    })
);

// Create PeerJS server
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/peerjs', // Ensure only one `/peerjs` is appended
    corsOptions: {
        origin: ['*'], // Add allowed origins here
        methods: ['GET', 'POST'],
    },
});

// Use PeerJS server at the `/peerjs` path
app.use('/peerjs', peerServer);

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
