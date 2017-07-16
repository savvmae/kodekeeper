const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');
const data = require('../models/users');
let server = request.agent('http://localhost:3000');

let user_id;

after("delete all users", function (done) {
    data.users.deleteMany({}).then(() => done()).catch(done);
});

describe("snippetRouter", function () {
    it("should redirect from dashboard, not authenticated", function (done) {
        server
            .get("/api/dashboard")
            .type('form')
            .expect(302)
            .end(done);
    });
    it("should redirect from create snippet page, not authenticated", function (done) {
        server
            .get("/api/create-snippet")
            .type('form')
            .expect(302)
            .end(done);
    });
    it("should redirect from filtered by language page not authenticated", function (done) {
        server
            .post("/api/dashboard/language")
            .type('form')
            .expect(302)
            .end(done);
    });
    it("should redirect from filtered by tags page not authenticated", function (done) {
        server
            .post("/api/dashboard/tag")
            .type('form')
            .expect(302)
            .end(done);
    });

    it("should return signup successfully", function (done) {
        server
            .post("/api/signup")
            .type('form')
            .send({ email: "test2@test", password: 'test' })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: "test2@test",
                })
            })
            .end(done);

    })
    it("should return dashboard successfully", function (done) {
        server
            .get("/api/dashboard")
            .type('form')
            .expect(200)
            .end(done);
    });

    it("should return create snippet page successfully", function (done) {
        server
            .get("/api/create-snippet")
            .type('form')
            .expect(200)
            .end(done);
    });

    it("should create a snippet successfully", function (done) {
        server
            .post("/api/create-snippet")
            .type('form')
            .send({
                title: "function to append 3rd item to new array",
                body: "function blah blah blah",
                notes: "some stuff",
                language: "javascript",
                tags: "js code"
            })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: 'success' })
            })
            .end(done);
    })
    it("should create a snippet unsuccessfully, missing data", function (done) {
        server
            .post("/api/create-snippet")
            .type('form')
            .send({
                body: "function blah blah blah",
                notes: "some stuff",
                language: "javascript",
                tags: "js code"
            })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incomplete Data" })
            })
            .end(done);
    });

    it("should return dashboard successfully", function (done) {
        server
            .get('/api/single-snippet/:id')
            .type('form')
            .expect(200)
            .end(done);
    });

    it("should return dashboard filtered by tag", function (done) {
        server
            .post("/api/dashboard/tag")
            .type('form')
            .expect(200)
            .end(done);
    })
    it("should return dashboard filtered by language", function (done) {
        server
            .post("/api/dashboard/language")
            .type('form')
            .expect(200)
            .end(done);
    })

});