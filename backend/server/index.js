import config from "config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoute from "../routes/user_routes.js";
import { User } from "../schemas/credentialsSchema.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.get("clientUrl"),
    credentials: true,
  })
);

// Set up session middleware with cookies
app.use(
  session({
    secret: config.get("sessionSecret"),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, expires: 600000 },
  })
);

// Passport.js configuration
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(config.get("prefix"), userRoute);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Something broke!");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.get("dbUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB has been connected");
  } catch (err) {
    console.error("An error has occurred", err);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(config.get("port"), () => {
    console.log(
      `API server is running on ${config.get("host")}:${config.get(
        "port"
      )}${config.get("prefix")}`
    );
  });
};

startServer();
