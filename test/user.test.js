const request = require('supertest');
const expect =  require('chai').expect;
require('dotenv').config();
const mongoose = require('mongoose')

const app = require('../src/index')

const tempUser = {
    "firstName": "Test",
    "lastName": "User",
    "email": "testeadojdrddd@gmail.com",
    "password": "my-super-secret-password"
};
  
let tempToken;


describe("POST users", () => {
  before((done) => {
    mongoose.connection.db.dropDatabase()
    done();
  });

  it("should register new user with valid credentials", (done) => {
    request(app)
      .post("/user/register")
      .send(tempUser)
      .expect(200)
      .then((res) => {
        expect(res.body.email).to.be.eql(tempUser.email);
        done();
      })
      .catch((err) => done(err)
      );
  });

  it("shouldn't accept the email that already exists in the database", (done) => {
    request(app)
      .post("/user/register")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.be.eql(`email "${tempUser.email}" is already taken`);
        done();
      })
      .catch((err) => done(err));
  });
});
  