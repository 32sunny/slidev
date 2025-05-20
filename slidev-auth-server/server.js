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
    <html>
      <head>
        <title>Login</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .login-box {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
          }
          input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          button {
            width: 100%;
            padding: 10px;
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          button:hover {
            background-color: #4338ca;
          }
        </style>
      </head>
      <body>
        <div class="login-box">
          <h2>Login to View Presentation</h2>
          <form method="POST" action="/login">
            <input name="username" placeholder="Username" required /><br/>
            <input type="password" name="password" placeholder="Password" required /><br/>
            <button type="submit">Login</button>
          </form>
        </div>
      </body>
    </html>
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
