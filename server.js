const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//turn on routes
app.use(routes);
//static method - express middleware that takes all conents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

//turn on connection to db and server
//if force: true that would drop the database tables on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});