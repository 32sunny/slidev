const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
 
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Login page
app.get('/login', (req, res) => {
  res.send(`
    <h2>Login to View Presentation</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>.');
  }
});

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
}


app.get('/', requireAuth, (req, res) => {
  res.redirect('https://harmonious-yeot-605074.netlify.app/');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
