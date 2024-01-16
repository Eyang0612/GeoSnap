const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const session = require('express-session');
const flash = require('connect-flash');
const { isAuthenticated, storeId }= require('./middleWare/authentication');
const methodOverride = require('method-override');
//const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');


const User = require('./models/user');
const Image = require('./models/images')

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true
}));

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//const userRoutes = require('./routes/users');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
//app.use(cookieParser());
//app.use(bodyParser());


mongoose.connect('mongodb://localhost/GeoSnap');

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost/GeoSnap'
}),
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false
  }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      console.log('User found:', user);
      return user;
    } else {
      console.log('No user found with that email');
      return null;
    }
  } catch (error) {
    console.error('Error finding user:', error);
  }
};


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
  passport.authenticate('local', { failureRedirect: '/Login', keepSessionInfo: true }),
  async function(req, res) {
    if (req.user && req.user.email) {
      const userData = await findUserByEmail(req.user.email);

      if (userData) {
        const parsedData = {
          _id: userData._id, // Convert ObjectId to string
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname
        }
        
        //console.log(req.session)
        //console.log(req.sessionID);
        res.status(201).json(parsedData);
      } else {
        // User not found in DB
        res.status(404).send('User not found');
      }
    } else {
      // User data not available in req.user
      res.status(400).send('Bad request');
    }
  }
  
);

app.post('/images', async (req, res) => {
  try {
  const { imageUrl, userId, countryIso, stateIso, city, latitude, longitude, description } = req.body;
  console.log(userId);
  const newImage = new Image({ imageUrl, userId, countryIso, stateIso, city, latitude, longitude, description } );
  const savedImage = await newImage.save();
  res.status(201).json(savedImage);
    // Find the user by username
    //const foundUser = await Image.find({ userId});

    //if (!foundUser) {
    //  return res.status(404).json({ error: 'User not found' });
    //}
    

    // Compare the provided password with the hashed password in the database
  

    // If username and password are valid, you can create and return a JWT token for authentication
    // For simplicity, let's return a success message
    //res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/images/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const images = await Image.find({ userId: userId });
    console.log(images);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/user-images/:imageId', async (req, res) => {
  try {
    const _id = req.params.imageId;
    const image = await Image.findOne({ _id: _id });
    console.log(image);
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*app.get('/verifySession', async (req, res) => {
  if (req.user && req.user._id) {
      console.log("User is authenticated");
      res.json({ isAuthenticated: true }); 
  } else {
    console.log(req.session)
    
      console.log("User is not authenticated");
      res.json({ isAuthenticated: false });
  }
});*/





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