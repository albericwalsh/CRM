// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();

// Middleware globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exemple de session (tu pourras ajuster ou remplacer par JWT plus tard)
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Routes (on ajoutera auth + user + autre plus tard)
app.use('/api', (req, res) => {
    res.send('API CRM en ligne 🚀');
});

const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);


module.exports = app;
