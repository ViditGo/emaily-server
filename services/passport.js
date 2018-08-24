const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({googleID : profile.id});
            if(existingUser){
                console.log("You are welcome!");
                done(null, existingUser);
            }
            else {
    const newUser = await new User({googleID : profile.id}).save();
                    done(null, newUser);
                }
}));
   
// passport.use(new TwitterStrategy({
//     clientID : keys.twitterClientID,
//     clientSecret : keys.twitterClientSecret,
//     callbackURL : '/auth/twitter/callback',
//     proxy: true
// }, async (accessToken, refreshToken, profile, done) => {

//     const existingUser = await User.findOne({twitterID : profile.id});
//             if(existingUser){
//                 console.log("You are welcome!");
//                 done(null, existingUser);
//             }
//             else {
//     const newUser = await new User({twitterID : profile.id}).save();
//                     done(null, newUser);
//                 }
// }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
const user = await User.findByID(id)
        done(null, user);
})


