const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');

// user routes good!
// describe("userRouter", function () {
//     it("should return successfully", function (done) {
//         request(application)
//             .get("/")
//             .expect(200)
//             .end(done);
//     })
//     it("should return successfully", function (done) {
//         request(application)
//             .get("/signup")
//             .expect(200)
//             .end(done);
//     })
//     it("should return successfully", function (done) {
//         request(application)
//             .post("/api/signup")
//             .type('form')
//             .send({ email: "test@test", password: 'test' })
//             .expect(200)
//             .end(done);
//     })
//     it("should return unsuccessfully", function (done) {
//         request(application)
//             .post("/api/signup")
//             .type('form')
//             .send({ email: "test@test" , password: "test"})
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, {message: "That email is already registered. Log in to continue."})
//             })
//             .end(done);
//     })
//     it("should return unsuccessfully", function (done) {
//         request(application)
//             .post("/api/signup")
//             .type('form')
//             .send({ password: 'test' })
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, { message: "Missing Data Fields" });
//             })
//             .end(done);
//     })
//     it("should return successfully", function (done) {
//         request(application)
//             .post("/api/login")
//             .type('form')
//             .send({ email: "test@test", password: 'test' })
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, { message: 'Success' });
//             })
//             .end(done);
//     })

//     it("should return unsuccessfully", function (done) {
//         request(application)
//             .post("/api/login")
//             .type('form')
//             .send({ email: "testblahhh@test", password: 'test' })
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, { message: "Incorrect password or username" });
//             })
//             .end(done);
//     })
// });