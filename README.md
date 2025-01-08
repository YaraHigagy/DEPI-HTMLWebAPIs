# Interactive Drag-and-Drop Animation App

This project is a web-based interactive application that combines animations, drag-and-drop functionality, chat messaging, and real-time updates using modern web APIs.

## Features
- **Dynamic Animations**: Looping animations for various items using custom frame-based image transitions.
- **Drag-and-Drop Interaction**: Move items to specific map locations with HTML Drag-and-Drop API.
- **Chat System**: Persistent chat messages stored locally with HTML Web Storage.
- **Real-Time Notifications**: Receive updates from the server using the Server-Sent Events (SSE) API.
- **Web Worker Integration**: Offload chat rendering to a Web Worker for better performance.

## Technologies Used
- **HTML, CSS, JavaScript**: Core structure, styling, and functionality.
- **Web APIs**: Drag-and-Drop, Web Storage, Web Workers, and SSE.
- **Local Storage**: Save and retrieve chat messages.

## File Structure
- **index.html**: Main structure of the app.
- **main.js**: Core functionality, including animations, drag-and-drop, chat, and SSE.
- **styles.css**: Styling for layout, animations, and responsiveness.
- **worker.js**: Web Worker script for handling chat messages.
- **imgs/**: Folder containing animation frames.

## Future Improvements
- Add more animations and interactive elements.
- Enhance the chat system with server-side integration.
- Improve UI/UX design for better user experience.