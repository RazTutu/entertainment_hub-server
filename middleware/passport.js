const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
// models
const Users = require("../models/userModel");

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const username = profile.displayName;
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const avatar = profile.photos[0].value;
    const foundUser = await Users.findOne({email: email});
    if(foundUser){
      // user already exist
    } else {
      // insert a new user into the database
      const user = new Users({
        email,
        username,
        avatar,
        googleId
      });
      const response = await user.save();
    }
    done(null, profile);
  }
));

// using cookies for save user info
passport.serializeUser((user, done) => {
  console.log("serialize user: ", user);
  // sending only id for the cookies
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log("deser user: ", user.id)
  // done(null, user)
  const userEmailID = user.id
  Users.find({emailId: userEmailID}).then((foundUser) => {
    done(null, foundUser)
  })
})
