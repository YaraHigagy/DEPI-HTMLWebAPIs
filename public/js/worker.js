// worker.js

onmessage = function(e) {
    const comments = e.data;  // Get the comments from the main thread
    // console.log('Received comments:', comments); // Debugging line

    // Process comments to add prefix with letter count
    const modifiedComments = comments.map(comment => {
        let modifiedComment;
        if(comment) {
            const letterCount = comment.length; // Get the length of the comment
            // return `[${letterCount}] ${comment}`; // Add prefix with letter count
            
            modifiedComment = `[${letterCount}] ${comment}`; // Add prefix with letter count
            // console.log('Modified comment:', modifiedComment); // Debugging line
            return modifiedComment;
        } else {
            modifiedComment = 'comment failed'
        }
    });

    // postMessage(comments);  // Send the modified comments back to the main thread
    postMessage(modifiedComments);  // Send the modified comments back to the main thread
};




// // For testing
// // worker.js
// onmessage = function(e) {
//     console.log('Worker received:', e.data); // Check if this logs in worker's console
//     postMessage('Hello from Worker!');
// };
