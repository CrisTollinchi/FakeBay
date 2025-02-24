import express from "express";
import { User, Profile } from "../schemas/credentialsSchema.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user || !user.comparePassword(password)) {
        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, {
      name: 0,
      age: 0,
      created: 0,
      updated: 0,
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
const userRoute = express.Router();

// Login route
userRoute.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

// Logout route
userRoute.post("/logout", (req, res) => {
  const cookieName = Object.keys(req.cookies).toString();
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie(`${cookieName}`);
      res.json({ message: "Logged out successfully" });
    });
  });
});

// Verify credentials
async function verifyCredentials(username, password) {
  const user = await User.findOne({ username });
  if (!user) return false;
  return user.comparePassword(password);
}

// Profile update route
userRoute.post("/update-profile", async (req, res) => {
  const { username, password, profileData } = req.body;
  const userId = req.user._id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Verify credentials
    const isVerified = await verifyCredentials(username, password);
    if (!isVerified)
      return res.status(401).json({ message: "Verification failed" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileData = { ...user.profileData, ...profileData };
    await user.save();

    res.json({
      message: "Profile updated successfully",
      profileData: user.profileData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

userRoute.post("/register", async (req, res) => {
  const { username, password, ...profileData } = req.body;

  if (!username || !password || !profileData) {
    res.status(400).json({
      success: false,
      message:
        "All fields must be filled out, age must be a number, and email should be over 10 characters.",
    });
  }
  try {
    const newUser = new User({
      password,
      username,
      profileData,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "You have been successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server problem try again later",
    });
  }
});

// Get user profile
userRoute.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({
    member: `${req.user.username}`,
    data: req.user,
  });
});

export default userRoute;
// Passport configuration
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await NewProfile.findOne({ username });
//       if (!user || !user.validatePassword(password)) {
//         return done(null, false, { message: "Invalid credentials" });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await NewProfile.findById(id, {
//       name: 0,
//       age: 0,
//       created: 0,
//       updated: 0,
//     });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
//! ==============================================================
// userRoute.get("/allUsers", async (req, res, next) => {
//   try {
//     const users = await Users.find({});
//     return res.status(200).json(users);
//   } catch (err) {
//     console.log(err.message);
//     res.send(500).send({ message: err.message });
//   }
// });

// // This POST is to create a new user
// userRoute.post("/createUser", async (req, res) => {
//   try {
//     //   if (
//     //     !req.body.first_name ||
//     //     !req.body.last_name ||
//     //     !req.body.email ||
//     //     !req.body.age ||
//     //     !req.body.password ||
//     //     !req.body.username
//     //   ) {
//     //     return res.status(400).json({
//     //       success: false,
//     //       data: { message: "You must fill out all fields." },
//     //     });
//     //   }
//     const newUser = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       username: req.body.username,
//       email: req.body.email,
//       age: req.body.age,
//       password: req.body.password,
//     };

//     const user = await Users.create(newUser);

//     return res.status(201).send(user);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: err.message });
//   }
// });

// // This POST is to login a user
// userRoute.post("/login", async (req, res) => {
//   let { username, password } = req.body;

//   let existingUser;
//   try {
//     existingUser = await Users.findOne(
//       { username: username, password: password },
//       { _id: 1, username: 1 }
//     );
//     // console.log(existingUser);
//   } catch (err) {
//     console.log({ message: err });
//   }
//   if (!existingUser) {
//     return res.status(404).json({
//       success: false,
//       data: { message: "Credentials do not match" },
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     data: existingUser,
//   });
// });

// userRoute.get("/:id/auctionOff", async (req, res) => {
//   const { id } = req.params;
//   let existingUser;
//   try {
//     existingUser = await Users.findById(id, { auctionOff: 1 });
//   } catch (error) {
//     console.log(error);
//   }
//   if (existingUser && existingUser.auctionOff.length === 0) {
//     return res.status(200).json({
//       success: false,
//       data: { message: "You have no items for auction." },
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     data: existingUser.auctionOff,
//   });
// });

// userRoute.get("/:id/findOne", async (req, res) => {
//   const { id } = req.params;
//   let existingUser;
//   try {
//     existingUser = await Users.findById(id, { password: 0 });
//     if (existingUser) {
//       res.status(200).json({
//         success: true,
//         data: existingUser,
//       });
//     } else {
//       res.status(200).json({
//         success: false,
//         data: { message: "User does not exist." },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// userRoute.put("/updateProfile/:id", async (req, res) => {
//   const { id } = req.params;
//   const { password } = req.body;
//   let existingUser;
//   let upDatedUser;
//   try {
//     existingUser = await Users.findById(id);

//     if (existingUser.password === password) {
//       upDatedUser = await Users.findByIdAndUpdate(id, req.body);
//       await upDatedUser.save();
//       return res.status(200).json({
//         success: true,
//         message: "Profile updated successfully",
//       });
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "Credentials do not match!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// userRoute.put("/updateProduct/:id", async (req, res) => {
//   const { id } = req.params;
//   const { password, username } = req.body;

//   let existingUser;
//   try {
//     existingUser = await Users.findOne({ password, username });
//     if (existingUser) {
//       const idCheck = existingUser.auctionOff.id(id)._id;
//       await Users.updateOne(
//         { _id: existingUser._id, "auctionOff._id": idCheck },
//         { $set: { "auctionOff.$.description": req.body.description } },
//         { $set: { "auctionOff.$.title": req.body.title } },
//         { $set: { "auctionOff.$.category": req.body.category } },
//         { $set: { "auctionOff.$.description": req.body.description } },
//         { $set: { "auctionOff.$.yearBought": req.body.yearBought } }
//       );
//       const savedUser = await existingUser.save();
//       return res
//         .status(200)
//         .json({ success: true, message: "Product has been updated" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
