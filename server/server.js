const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('./app/services/auth').passport;
const isLoggedIn = require('./app/services/auth').isLoggedIn;

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const PORT = 4000;
const BUILD_PATH = process.env.MODE === 'PRODUCTION' ? './client/build' : '../client/build';

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', isLoggedIn, (req, res) => {
    res.redirect('/client');
});

app.use(express.static(path.join(__dirname, BUILD_PATH)));

app.get('/client*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, BUILD_PATH, 'index.html'));
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/category.routes')(app);