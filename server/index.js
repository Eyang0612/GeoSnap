const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


mongoose.connect('mongodb://localhost/GeoSnap');
const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    email: String,
    firstname: String,
    lastname: String,
  });

const User = mongoose.model('User', userSchema);


// POST route to handle user data submission
app.post("/api/users", async (req, res) => {
  try {
    const { _id, email, password, firstname, lastname } = req.body;
    const newUser = new User({ _id, email, password, firstname,lastname });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("working");
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
    console.log("failed");
  }
});

// Your existing route for rendering the home page

// Other routes or middleware can be added as needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});