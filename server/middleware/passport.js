const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile, ">> from profile");
        // Check if the user already exists in the database
        const user = await User.findOne({ where: { googleId: profile?.id } });

        if (user) {
          // User already exists, return the user
          done(null, user);
        } else {
          const hashedPassword = await bcrypt.hash(
            process.env.GOOGLE_PASSWORD,
            12
          );

          // User does not exist, create a new record in the database
          const newUser = await User.create({
            googleId: profile?.id,
            email: profile?.emails[0].value,
            firstName: profile?.name?.givenName,
            lastName: profile?.name?.familyName,
            password: hashedPassword,
          });

          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user by storing their ID in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Deserialize the user by retrieving their information from the database
  try {
    const user = await User.findByPk(id);

    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (err) {
    done(err, null);
  }
});
