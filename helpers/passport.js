
const passport = require('passport');
const User = require('../models/User');
var FacebookTokenStrategy = require('passport-facebook-token');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//segunda estrategia (facebook)
passport.use(new FacebookTokenStrategy({
    clientID: '1799675690120298',
    clientSecret: '3a65a6c49cece5809e8a79ebed0a6ec3'
  }, function(accessToken, refreshToken, profile, done) {
    
    User.findOne({facebookId:profile.id})
    .then(user=>{
        if(!user) return User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value,
            facebookId: profile.id
        })
        return done(null, user)
    })
    .then(user=>{
        return done(null, user)
    })
    .catch(e=>next(e))
    
  }
));

module.exports = passport;