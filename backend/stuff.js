// // To create a login session using Mongoose, Express, Passport, React, and Node.js, you can follow these steps:


// // Set up your project:

// // Initialize a new Node.js project and install the necessary dependencies.
// // mkdir my-auth-app
// // cd my-auth-app
// // npm init -y
// // npm install express mongoose passport passport-local express-session bcryptjs


// // Set up MongoDB and Mongoose:

// // Create a connection to your MongoDB database using Mongoose.
// // db.js
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
// module.exports = db;


// // Define the User model:

// // Create a Mongoose schema and model for your users.
// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };
// const User = mongoose.model('User', userSchema);
// module.exports = User;



// // Set up Passport for authentication:

// // Configure Passport to use the local strategy for authentication.
// // // passport-config.js
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('./models/User');
// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'Incorrect email.' });
//         }
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err);
//     }
//   });
// };


// // Set up Express and session management:

// // Configure Express to use sessions and Passport for authentication.
// // app.js
// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const db = require('./db');
// const User = require('./models/User');
// require('./passport-config')(passport);
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
//   failureFlash: true,
// }));
// app.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = new User({ email, password });
//     await user.save();
//     res.redirect('/login');
//   } catch (err) {
//     res.status(500).send('Error registering new user.');
//   }
// });
// app.get('/dashboard', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send('Welcome to your dashboard');
//   } else {
//     res.redirect('/login');
//   }
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

