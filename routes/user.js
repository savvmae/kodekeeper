const express = require('express');
const router = express.Router();
const model = require('../models/users');
const bodyParser = require('body-parser');
const crypto = require('crypto');

router.get('/', (request, response) => {
    return response.render('login');
});

router.get('/signup', async function (request, response) {
    return response.render('signup');
});

router.post('/api/signup', async function (request, response) {
    var user = await model.users.find({ email: request.body.email });
    if (user[0]) {
        return response.send({ message: "That email is already registered. Log in to continue." })
    }
    else if (request.body.email && request.body.password) {
        var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
        var newUser = await model.users.create({
                email: request.body.email,
                password: hashed
            });

        var modelStatus = {
            message: "success",
            data: newUser.email
        };

        var newUser = await model.users.find({ email: request.body.email });
        request.session.isAuthenticated = true;
        request.session.userId = newUser[0]._id;
        return response.send(modelStatus);

    } else {
        return response.send({ message: "Missing Data Fields" });
    }
});

router.post('/api/login', async function (request, response) {
    var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
    var user = await model.users.find({ email: request.body.email, password: hashed });
    if (user[0]) {
        request.session.isAuthenticated = true;
        request.session.userId = user[0]._id;
        return response.send({ message: 'Success' });
    } else if (!user[0]) {
        return response.send({ message: "Incorrect password or username" });
    }
});

module.exports = router;