const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//const userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost/GeoSnap');

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// POST route to handle user data submission
app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const newUser = new User({ email, firstname,lastname });
    const savedUser = await User.register(newUser, password);
    res.status(201).json(savedUser);
    console.log("working");
  } catch (error) {
    res.status(500).json({error: error.message || 'Could not create user' });
    console.log(error)
    console.log("failed");
  }
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/Login' }),
  function(req, res) {
    res.status(201).json(req.body);
  }
  
);

/*app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If username and password are valid, you can create and return a JWT token for authentication
    // For simplicity, let's return a success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});*/
// Other routes or middleware can be added as needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});