// // server/server.js
// import http from 'http';
// import {Server} from 'socket.io';
// const server = http.createServer((req, res) => {
//   // Handle HTTP requests if needed
// });

// const io = new Server(server, {
//   cors: {
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//   },
// });

// const messages = [];

// // const espaco = {
// //   name
// // }

// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Handle chat messages
//   socket.on('new message', (message) => {
//     messages.push(message);
//     io.emit('push message', messages); // Broadcast the message to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server listening on port 3001');
// });