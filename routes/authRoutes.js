const passport = require('passport');

module.exports = (app) => {

app.get('/auth/google', passport.authenticate( 'google', {
    scope: ['profile','email']
})
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/current_user', (req, res ) => {
    res.send(req.user);
})

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send('You have been logged out', () => {
        setTimeout(3000, () => {
            res.redirect('/api/login')
        });
    })
});

}