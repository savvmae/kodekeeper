const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');
const data = require('../models/users');

after("delete all users", function (done) {
    data.users.deleteMany({}).then(() => done()).catch(done);
});

describe("userRouter", function () {

    it("should return login page", function (done) {
        request(application)
            .get("/")
            .expect(200)
            .end(done);
    });
    it("should return singup", function (done) {
        request(application)
            .get("/signup")
            .expect(200)
            .end(done);
    });
    it("should post a new user", function (done) {
        request(application)
            .post("/api/signup")
            .type('form')
            .send({ email: "test@test", password: 'test' })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: "test@test"
                })
            })
            .end(done);
    });
    it("should post a new user unsuccessfully, email already registered", function (done) {
        request(application)
            .post("/api/signup")
            .type('form')
            .send({ email: "test@test", password: "test" })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "That email is already registered. Log in to continue." })
            })
            .end(done);
    });
    it("should post new user unsuccessfully, missing data", function (done) {
        request(application)
            .post("/api/signup")
            .type('form')
            .send({ password: 'test' })
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, { message: "Missing Data Fields" });
            })
            .end(done);
    });
    it("should post new user unsuccessfully, missing data", function (done) {
        request(application)
            .post("/api/signup")
            .type('form')
            .send({ email: 'test' })
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, { message: "Missing Data Fields" });
            })
            .end(done);
    });
    it("should return login successfullys", function (done) {
        request(application)
            .post("/api/login")
            .type('form')
            .send({ email: "test@test", password: 'test' })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: 'Success' });
            })
            .end(done);
    })

    it("should return login unsuccessfully, incorrect info", function (done) {
        request(application)
            .post("/api/login")
            .type('form')
            .send({ email: "testblahhh@test", password: 'test' })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incorrect password or username" });
            })
            .end(done);
    })
});