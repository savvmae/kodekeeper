const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');
const express = require('express');
const session = require('express-session');


application.use(session({
    secret: 'iAmASecret',
    saveUninitialized: true,
    resave: false
}));


describe("snippetRouter", function () {
    it("should return successfully", function (done) {
        request(application)
            .get("/api/dashboard")
            .send(request.session)
            .type('form')
            .expect(302)
            .end(done);
    });
    it("should return successfully", function (done) {
        request(application)
            .get("/api/create-snippet")
            .send(request.session)
            .type('form')
            .expect(200)
            .end(done);
    });
    it("should return successfully", function (done) {
        request(application)
            .post("/api/create-snippet")
            .type('form')
            // .send({ email: "test@test", password: 'test' })
            .expect(302)
            .end(done);
    })
    it("should return successfully", function (done) {
        request(application)
            .post("/api/create-snippet")
            .type('form')
            .send( request.session )
            .send ({
                        title: "some",
                        body: "code",
                        notes: "snippet",
                        language: "woo",
                        tags: "hoo"
                    })
            .expect(302)
            // .expect(response => {
            //     assert.deepEqual(response.body, { message: 'success' })
            // })
            .end(done);
    })
    // it("should return unsuccessfully", function (done) {
    //     request(application)
    //         .post("/api/signup")
    //         .type('form')
    //         .send({ email: "test@test" , password: "test"})
    //         .expect(200)
    //         .expect(response => {
    //             assert.deepEqual(response.body, {message: "That email is already registered. Log in to continue."})
    //         })
    //         .end(done);
    // })
});