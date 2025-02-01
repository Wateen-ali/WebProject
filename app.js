require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');


const app = express();
const PORT = process.env.PORT || 5001;
const HOST = '0.0.0.0'; // Allows access from other devices

// Session setup
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

// Static files
app.use(express.static('public'));

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/screens/auth'));
app.use('/', require('./server/screens/index'));
app.use('/', require('./server/screens/homescreen'));

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

//routers
const path = require("path");

// Set Express view engine and update views directory to include subfolders
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure Express can find views inside subfolders
