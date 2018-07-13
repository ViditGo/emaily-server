const app = require('express')();
require('./db/models/Users');
require('./services/passport');
require('./db/mongoose_connect');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;
require('./routes/authRoutes')(app);

app.use(
    cookieSession({
        maxAge : 24*60*60*1000,
        keys: [keys.cookieKey]
})
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => console.log("Server restarted"));