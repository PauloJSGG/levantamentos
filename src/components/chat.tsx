// 'use client';
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const socket = io('http://localhost:3001',{
//   extraHeaders: {
//     'Access-Control-Allow-Origin': '*',
//   }}); // Replace with your server URL

//   useEffect(() => {
//     // Connect to the server
//     socket.connect();

//     // Listen for incoming messages
//     socket.on('push message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Clean up the socket connection on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() !== '') {
//       // Send the message to the server
//       socket.emit('new message', inputValue);

//       // Clear the input field
//       setInputValue('');
//     }
//   };

//   return (
//     <div
//     className='flex flex-col justify-between p-4 border border-gray-300 h-96 w-96
//     fixed bottom-4 right-4 bg-white rounded-xl shadow-md'
//     >
//       <div
//         // side chat
//         className='border border-gray-300 p-4 h-96 overflow-y-auto
//         '
//         >
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         className='border border-gray-300 p-2'
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
