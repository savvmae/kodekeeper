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
            .type('form')
            .expect(302)
            .end(done);
    });
    it("should return successfully", function (done) {
        request(application)
            .get("/api/create-snippet")
            .type('form')
            .expect(200)
            .end(done);
    });
    it("should return successfully", function (done) {
        request(application)
            .post("/api/create-snippet")
            .type('form')
            .expect(302)
            .end(done);
    })
    it("should return successfully", function (done) {
        request(application)
            .post("/api/dashboard/tag")
            .type('form')
            .expect(302)
            .end(done);
    })
    it("should return successfully", function (done) {
        request(application)
            .post("/api/dashboard/language")
            .type('form')
            .expect(302)
            .end(done);
    })

});