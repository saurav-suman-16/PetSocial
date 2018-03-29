const router = require('express').Router();
const passport = require("passport");

router.get('/login-google', passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect(`http://localhost:3000/main/googlelogin/${req.user.email}`)
});

module.exports = router;