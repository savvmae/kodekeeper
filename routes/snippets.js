const express = require('express');
const router = express.Router();
const model = require('../models/users');
const bodyParser = require('body-parser');

router.get('/api/dashboard', async  (request, response) => {

    if (request.session.isAuthenticated === true) {
        var user = await model.users.find({ _id: request.session.userId })
            .populate('snippets')
            .exec(function (err, result) {
                var languages = [];
                var tags = [];
                for (i = 0; i < result[0].snippets.length; i++) {
                    if (languages.indexOf(result[0].snippets[i].language) === -1) {
                        languages.push(result[0].snippets[i].language);
                    }
                }
                for (k = 0; k < result[0].snippets.length; k++) {
                    for (j = 0; j < result[0].snippets[k].tags.length; j++) {
                        if (tags.indexOf(result[0].snippets[k].tags[j]) === -1) {
                            tags.push(result[0].snippets[k].tags[j]);
                        }
                    }
                }
                var modelStatus = {
                    snippets: result[0].snippets,
                    languages: languages,
                    tags: tags
                }
                return response.render('dashboard', modelStatus);
            });
    } else {
        return response.redirect('/');
    }
});

router.post('/api/dashboard/language', async  (request, response) => {
    if (request.session.isAuthenticated === true) {
        var requestedLanguageSnippets = [];
        var user = await model.users.find({ _id: request.session.userId })
            .populate('snippets')
            .exec(function (err, result) {
                if (err) return handleError(err);
            });
        for (i = 0; i < user[0].snippets.length; i++) {
            if (user[0].snippets[i].language === request.body.language) {
                requestedLanguageSnippets.push(user[0].snippets[i]);
            }
        }
        var modelStatus = {
            snippets: requestedLanguageSnippets
        }
        return response.render('filtered', modelStatus);
    } else {
        return response.redirect('/');
    }
});

router.post('/api/dashboard/tag', async  (request, response) => {
    if (request.session.isAuthenticated === true) {
        var containsTag = [];
        var user = await model.users.find({ _id: request.session.userId })
            .populate('snippets')
            .exec(function (err, result) {
                for (k = 0; k < result[0].snippets.length; k++) {
                    for (j = 0; j < result[0].snippets[k].tags.length; j++) {
                        if (result[0].snippets[k].tags[j] === request.body.tags) {
                            containsTag.push(result[0].snippets[k]);
                        }
                    }
                }
            });
        var modelStatus = {
            snippets: containsTag
        }
        return response.render('filtered', modelStatus);
    } else {
        return response.redirect('/');
    }
});

router.get('/api/create-snippet',function (request, response) {
        return response.render('create-snippet');
});

router.post('/api/create-snippet', async (request, response) =>{
    if (request.session.isAuthenticated === true) {
        var tags = request.body.tags.split(' ');
        var user = await model.users.find({ _id: request.session.userId })
            
            .exec(function (err, result) {
                if (request.body.title && request.body.body && request.body.language && request.body.tags) {
                    var newSnippet = new model.snippet({
                        title: request.body.title,
                        body: request.body.body,
                        notes: request.body.notes,
                        language: request.body.language,
                        tags: tags
                    });
                    
                    newSnippet.save(function (err, data) {
                        user[0].snippets.push(data._id);
                        user[0].save();
                    })
                    return response.json({ message: 'success' });
                } else {
                    return response.send({ message: "Incomplete Data" })
                }
            });
    } else {
        return response.redirect('/');
    }
});

router.get('/api/single-snippet/:id', async (request, response) => {
    if (request.session.isAuthenticated === true) {
        var user = await model.users.find({ _id: request.session.userId })
            .populate('snippets')
            .exec(function (err, result) {
                if (err) return handleError(err);
            });
        var snippet = user[0].snippets.find(q => q.id === request.params.id);
        var modelStatus = {
            snippet: snippet
        }
        return response.render('single-snippet', modelStatus);
    } else {
        return response.redirect('/');
    }
});

module.exports = router;