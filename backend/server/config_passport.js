import LocalStrategy from "passport-local";
import { Users } from "../schemas/userSchema";

export default function (passport) {
  passport.use(
    new LocalStrategy(
      { username: "username" },
      async (username, password, done) => {
        try {
          const user = await Users.findOne({ username });
          if (!user) {
            return done(null, false, { message: "Incorrect username" });
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (error) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
