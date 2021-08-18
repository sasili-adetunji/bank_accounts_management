const expect =  require('chai').expect;
const mongoose = require('mongoose')
const request = require('supertest');
const app = require('../src/index')

require('dotenv').config();

const tempUser = {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@gmail.com",
    "password": "icepasswe"
};
  
const tempUser2 = {
  "firstName": "Test",
  "lastName": "User",
  "email": "test2@gmail.com",
  "password": "newPass"
};

describe("Signup user", () => {
  after((done) => {
    mongoose.connection.db.dropCollection('bankAccountTest', function(err, result) {console.log(err)});
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

  it("should create an account after signup", (done) => {
    request(app)
      .post("/user/register")
      .send(tempUser2)
      .expect(200)
      .then((res) => {
        expect(res.body.accounts).to.be.an('array');
        expect(res.body.accounts).to.have.lengthOf(1);
        expect(Number.isInteger(res.body.accounts[0]))
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
    
  describe('Login user', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase()
      done();
    });

    it("shouldn't log in with invalid credentials", (done) => {
      request(app)
        .post("/user/login")
        .send({
          email: 'test2@gmail.com',
          password: 'password'})
        .expect(400)
        .then((res) => {
          expect(res.body.message).to.be.eql("email or password is incorrect");
          done();
        })
        .catch((err) => done(err));
    });

    it('Should authenticate a user successfully', (done) => {
      request(app)
        .post('/user/login')
        .send(tempUser)
        .expect(200)
        .then((res) => {
          expect(res.body.email).to.be.eql(tempUser.email);
          expect(res.body.token).to.be.a('string');
          done();
        })
        .catch((err) => done(err));
    });
  });
});
