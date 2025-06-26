// Base URL for the local JSON server
const BASE_URL = 'http://localhost:3000/posts';

/**
 * Fetches all blog posts from the server and renders them into the #post-list
 * Also displays the first post's details automatically (advanced feature)
 */
function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = ''; // Clear existing posts

      posts.forEach(post => {
        // Create a clickable element for each post title
        const div = document.createElement('div');
        div.textContent = post.title;
        div.style.cursor = 'pointer';

        // Attach click event to load full post details
        div.addEventListener('click', () => handlePostClick(post.id));

        // Add to DOM
        postList.appendChild(div);
      });

      // Auto-load first post when page loads (Advanced Deliverable)
      if (posts.length > 0) {
        handlePostClick(posts[0].id);
      }
    });
}

/**
 * Fetches and displays details for a single post by ID
 * Populates #post-detail section with title, content, author, and image
 */
function handlePostClick(postId) {
  fetch(`${BASE_URL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      // Populate the detail section with the selected post's info
      document.getElementById('detail-title').textContent = post.title;
      document.getElementById('detail-content').textContent = post.content;
      document.getElementById('detail-author').textContent = post.author;
      document.getElementById('detail-image').src = post.image;
    });
}

/**
 * Attaches a submit listener to the new post form
 * Gathers data from input fields and sends it to the server using a POST request
 * Refreshes the post list after submission and clears the form
 */
function addNewPostListener() {
  const form = document.getElementById('new-post-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default page reload on form submit

    // Construct a new post object from form values
    const newPost = {
      title: document.getElementById('new-title').value,
      content: document.getElementById('new-content').value,
      author: document.getElementById('new-author').value,
      image: document.getElementById('new-image').value || "https://via.placeholder.com/150"
    };

    // Send POST request to create new post on the server
    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(() => {
        // Refresh the post list and clear the form after success
        displayPosts();
        form.reset();
      });
  });
}

/**
 * Main function to initialize the app
 * Called after the DOM has fully loaded
 */
function main() {
  displayPosts();         // Load and display all posts
  addNewPostListener();   // Enable new post creation
}

// Initialize the app when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', main);
