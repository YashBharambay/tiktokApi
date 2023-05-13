const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;


// Set up session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are valid
  if (username === 'my-username' && password === 'my-password') {
    // Store user info in session
    req.session.user = {
      username: username,
      isLoggedIn: true
    };

    res.status(200).send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials!');
  }
});

// Logout route
app.post('/logout', (req, res) => {
  // Destroy session to log user out
  req.session.destroy();

  res.status(200).send('Logout successful!');
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
