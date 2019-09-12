const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('./app/services/auth').passport;
const isLoggedIn = require('./app/services/auth').isLoggedIn;
const fs = require('fs');

require('dotenv').config({path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

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

require('./app/routes/auth.routes')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/user.routes')(app);

const renderIndexHTML = (request, response) => {
    // get the html file created with the create-react-app build
    const indexHTMLPath = path.resolve(__dirname, process.env.build_path, 'index.html');
    const isAuth = request.isAuthenticated();

    fs.readFile(indexHTMLPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return response.status(404).end()
        }

        return response.send(htmlData.replace('__INITIAL_STATE__={}', `__INITIAL_STATE__={isAuth:${isAuth}}`));
    });
};

app.use(express.static(path.join(__dirname, process.env.build_path), {
    index: false
}));

app.get('/product*', renderIndexHTML);

app.get('*', isLoggedIn, renderIndexHTML);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.listen(process.env.port, () => {
    console.log(`Server is listening on port ${process.env.port}`);
});
