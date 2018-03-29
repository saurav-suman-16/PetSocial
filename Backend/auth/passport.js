const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require('../keys');
const user = require('../schemas/userschema');

passport.serializeUser((user, done) => {
    console.log('ser');
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    user.findById(id).then((user) => {
        console.log('asdfsadfvczx', user);
        done(null, user);
    });
});

passport.use("google",
    new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientid,
            clientSecret: keys.google.clientsecret
        },
        (accessToken, refreshToken, profile, done) => {
            user.findOne({
                    email: profile.emails[0].value
                })
                .then(currentuser => {
                    if (currentuser) {
                        done(null, currentuser)
                    } else {
                        new user({
                            firstname: profile.name.familyName,
                            lastname: profile.name.givenName,
                            email: profile.emails[0].value,
                            verified: true,
                            sex: profile.gender,
                            imagename: profile._json.image.url,
                            src: profile._json.image.url,
                            googleid: profile.id
                        }).save().then((newuser) => {
                            done(null, newuser);
                        })
                    }
                })
        })
)