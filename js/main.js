const searchbar = document.querySelector('.searchbar input');

searchbar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch(searchbar.value);
    }
});

function performSearch(query) {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Search results:', data);
            // Display search results on the page
        })
        .catch((error) => {
            console.error('Error fetching search results:', error);
        });
}

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click', () => {
    showLoginModal();
});

signupBtn.addEventListener('click', () => {
    showSignupModal();
});

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginClose = document.querySelector('#login-modal .close');
const signupClose = document.querySelector('#signup-modal .close');

function showLoginModal() {
  loginModal.style.display = 'block';
}

function showSignupModal() {
  signupModal.style.display = 'block';
}

function closeModal(modal) {
  modal.style.display = 'none';
}

loginClose.addEventListener('click', () => {
    closeModal(loginModal);
});
  
signupClose.addEventListener('click', () => {
    closeModal(signupModal);
});

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        closeModal(loginModal);
    } else if (event.target === signupModal) {
        closeModal(signupModal);
    }
});

const express = require('express');
const users = require('./users').default;

const app = express();
app.use(express.json());

app.post('/signup', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.signup(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.login(username, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
