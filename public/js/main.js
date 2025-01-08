// ==================== Selectors ====================
const chatInput = document.querySelector('#chat-txt');
const chatBtn = document.querySelector('#chat-btn');
const commentsList = document.querySelector('#comments-List');

// ==================== Animation for Images ====================
function animateItem(itemSelector, itemName, frameCount = 8, frameRate = 200) {
    const item = document.querySelector(itemSelector);
    if (!item) {
        console.error('Invalid item selector.');
        return;
    }

    let currentFrame = 1;

    setInterval(() => {
        item.innerHTML = `<img src="../imgs/${itemName}/${itemName}-${currentFrame}.png" alt="Animation frame ${currentFrame}" />`;
        currentFrame = (currentFrame % frameCount) + 1; // Loop back to the first frame
    }, frameRate);
}

animateItem('#items > div:nth-child(1)', 'basketball', 9);
animateItem('#items > div:nth-child(2)', 'dance', 10);
animateItem('#items > div:nth-child(3)', 'dog', 6);
animateItem('#items > div:nth-child(4)', 'rolling');
animateItem('#items > div:nth-child(5)', 'skating-boy');
animateItem('#items > div:nth-child(6)', 'skating-girl-1');
animateItem('#items > div:nth-child(7)', 'skating-girl-2');
animateItem('#items > div:nth-child(8)', 'tortoise');

// ==================== HTML Drag and Drop API ====================
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const parent = ev.currentTarget;
    ev.dataTransfer.setData("text", parent.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    if (ev.target !== draggedElement) { // Prevent dropping on itself
        ev.target.appendChild(draggedElement);
    }
}

// Add draggable behavior to parent elements
document.querySelectorAll('#items>div').forEach((parent) => {
    parent.setAttribute('draggable', 'true'); // Make the element draggable
    parent.addEventListener('dragstart', drag);

    // Prevent child elements from interrupting dragging
    parent.querySelectorAll('*').forEach((child) => {
        child.addEventListener('dragstart', (ev) => {
            ev.stopPropagation(); // Prevent child dragstart
        });
    });
});

// Add event listeners to drop zones
document.querySelectorAll('#map-locations>div').forEach((dropZone) => {
    dropZone.addEventListener('dragover', allowDrop);
    dropZone.addEventListener('drop', drop);
});

// ==================== HTML Web Storage API ====================
const chatMsgs = JSON.parse(localStorage.getItem('chatMsgs')) || [];
if (!localStorage.getItem('chatMsgs')) {
    localStorage.setItem('chatMsgs', JSON.stringify(chatMsgs));
}

function getInputData() {
    const message = chatInput.value.trim();
    if (message) { // Only add non-empty messages
        chatMsgs.push(message);
        localStorage.setItem('chatMsgs', JSON.stringify(chatMsgs));
        chatInput.value = '';
        worker.postMessage(chatMsgs);  // Send updated comments to the worker
    }
}

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getInputData();
    }
});

chatBtn.addEventListener('click', (e) => {
    getInputData();
});

// ==================== HTML Web Workers API ====================

// Create a worker
let worker;
try {
    worker = new Worker('./js/worker.js');
} catch (error) {
    console.error('Failed to create a worker:', error);
}

// Listen for messages from the worker
if (worker) {
    worker.onmessage = function (e) {
        const comments = e.data;  // Get the comments from the worker
        displayComments(comments);  // Display the comments on the page
    };
}

// Function to display comments
function displayComments(comments) {
    // console.log('Displaying comments:', comments); // Debugging line
    
    commentsList.innerHTML = '';  // Clear the current list
    comments.forEach(comment => {
        if (comment) { // Check for valid comment before displaying
            const li = document.createElement('li');
            li.textContent = comment;
            commentsList.appendChild(li);
        }
    });
}

// Load comments when the page is loaded
window.onload = function () {
    const comments = JSON.parse(localStorage.getItem('chatMsgs')) || [];
    if (comments.length > 0) { // Only send non-empty comments to the worker
        worker.postMessage(comments);  // Send the comments to the worker for display
    }
};

/*// // For testing

// const worker = new Worker('./js/worker.js');

// worker.onmessage = function(e) {
//     console.log('Message from worker:', e.data); // Should log when message is received
// };

// worker.postMessage('Hello Worker!');
*/

// ==================== HTML SSE API ====================

// let source;
// try {
//     source = new EventSource('./server/sse.php');
//     source.onmessage = function(event) {
//         document.getElementById('notify').innerText += event.data;
//         console.log(event.data);
//     };
// } catch (error) {
//     console.error('Failed to create a server-sent event notification:', error);
// }

// SSE for receiving messages from server
const source = new EventSource('/events');

source.onmessage = function(event) {
    const messageElement = document.getElementById("notify");
    messageElement.innerText = event.data;
    messageElement.style.display = "block"; // Show the message

    // Hide the message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 5000);
};

source.onerror = function(event) {
    console.error("EventSource failed:", event);
    source.close(); // Close connection on error
};
