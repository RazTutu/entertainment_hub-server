const passport = require("passport");
const router = require("express").Router();

//const passportSetup = require("../passport");
const CLIENT_URL = "http://localhost:3000";

// this route will show google login choice
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google"),
  (req, res) => {
    // res.send(`you reached a callback uri: ${req.user.displayName}`)
    res.redirect(CLIENT_URL);
  }
);

router.get("/login/success", (req, res) => {
  // console.log("login req.user ==> ", req.user)
  if (req.isAuthenticated()) {
    res.json(req.user)
  } else {
    res.json({error: "Can not authenticate user"})
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;