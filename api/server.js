require('dotenv').config();
require('app-module-path').addPath(__dirname);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const rateLimit = require('express-rate-limit');

//Routers
const apiRouter = require('./routes/api/v1');
const usersRouter = require('./routes/api/v1/users');
const donationsRouter = require('./routes/api/v1/donations');

//App initialization
const app = express();

//Passport initialization
//Makes passport available throughout the app
require('config/passport');

//Configure the rate limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

//Connect to Mongo via mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then( () => console.log('MongoDB connected.') )
.catch( err => console.log(err) );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: "https://sp24-524-donationpal-monika.uc.r.appspot.com"
    }));
} else {
    app.use(cors());
}

app.use('/api/v1', apiRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/donations', donationsRouter);

module.exports = app;
