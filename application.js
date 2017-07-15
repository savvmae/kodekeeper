const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const model = require('./models/users');

const usersRouter = require('./routes/user.js');
const snippetsRouter = require('./routes/snippets.js');

const application = express();

application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache');
application.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost:27017/Snippets');

application.use(express.static(__dirname + '/public'));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

application.use(session({
    secret: 'iAmASecret',
    saveUninitialized: true,
    resave: false
}));

application.use(usersRouter);
application.use(snippetsRouter);


application.listen(application.get('port'), () => {
  console.log(`Listening on port ${application.get('port')}`)
});


module.exports = application;