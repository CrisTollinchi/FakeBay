// // PRODUCTS SCHEMA
// export const ProductsSchema = new mongoose.Schema({
//   id: {
//     type: mongoose.Types.ObjectId,
//     immutable: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     min: 30,
//   },
//   yearBought: {
//     type: Number,
//     required: true,
//   },
//   bid: {
//     type: Number,
//     required: true,
//   },
//   trades: [Object],
//   watches: {
//     type: Number,
//     default: 0,
//   },
//   created: {
//     type: Date,
//     immutable: true,
//     default: () => Date.now(),
//   },
//   updated: {
//     type: Date,
//     default: () => Date.now(),
//   },
//   sold: {
//     type: Boolean,
//     default: false,
//   },
// });

// ProductsSchema.pre("findOneAndUpdate", function (next) {
//   this.updated = Date.now();
//   next();
// });

// const userSchema = new mongoose.Schema({
//   first_name: {
//     type: String,
//     required: true,
//   },
//   last_name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 10,
//     lowercase: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 18,
//     max: 100,
//     immutable: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   sales: [Object],
//   bought: [Object],
//   created: {
//     type: Date,
//     // what this does is that once the date is made it won't change the date regardless of the default function below
//     immutable: true,
//     default: () => Date.now(),
//   },
//   updated: {
//     type: Date,
//     // this returns a new date every time
//     default: () => Date.now(),
//   },
// });

// import mongoose from "mongoose";
// import crypto from "crypto";

// const profileSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   hash: String,
//   salt: String,
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 10,
//     lowercase: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 18,
//     max: 100,
//     immutable: true,
//   },
//   created: {
//     type: Date,
//     immutable: true,
//     default: () => Date.now(),
//   },
//   updated: {
//     type: Date,
//     default: () => Date.now(),
//   },
// });

// profileSchema.pre("findOneAndUpdate", function (next) {
//   this.updated = Date.now();
//   next();
// });

// profileSchema.methods.setPassword = function (password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");
// };
// profileSchema.methods.validatePassword = function (password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");
//   return this.hash === hash;
// };

// export const NewProfile = mongoose.model("profiles", profileSchema);

// import mongoose, { Schema } from "mongoose";

// const profileSchema = new mongoose.Schema({
//   _id:
//   username: String,
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 10,
//     lowercase: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 18,
//     max: 100,
//     immutable: true,
//   },
//   created: {
//     type: Date,
//     immutable: true,
//     default: () => Date.now(),
//   },
//   updated: {
//     type: Date,
//     default: () => Date.now(),
//   },
// });

// profileSchema.methods.connectName = function (first, last) {
//   return (this.name = `${first} ${last}`);
// };

// export const Profile = mongoose.model("profiles", profileSchema);

import mongoose from 'mongoose';
import crypto from "crypto"

export const Profile = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
    immutable: true,
  },
})

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  profileData:Profile,
  created: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updated: {
    type: Date,
    default: () => Date.now(),
  },
});

// Generate salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Hash password with salt
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Pre-save hook to set salt and hash password
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.salt = generateSalt();
  this.password = hashPassword(this.password, this.salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = function(password) {
  const hashedPassword = hashPassword(password, this.salt);
  return this.password === hashedPassword;
};
UserSchema.pre("findOneAndUpdate", function (next) {
  this.updated = Date.now();
  next();
});
export const User = mongoose.model('User', UserSchema);