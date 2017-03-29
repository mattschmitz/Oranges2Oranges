var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var dbIndex = require('../db/index.js');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');

var db = dbIndex.db
var User = dbIndex.userModel

var userOne = {
  username: 'justinisgreat', 
  email: 'justinisgreat@gmail.com', 
  password: 'justinisgreat'
}

describe('User Login', function() {

  it('should allow new users to sign up', function (done) {
    server
    .post('/signup')
    .send(userOne)
    .expect(201)
    .end(function(err, res) {
      if(err) return done(err);
      done();
    });
  })

  it('should allow a signed up user to login', function(done) {
    server
    .post('/login')
    .send({
      username: userOne.username,
      password: userOne.password
    })
    .expect(201)
    .end(done);
  });

  it('should not allow a user to login with the wrong password', function(done) {
    server
    .post('/login')
    .send({
      username: userOne.username,
      password: userOne.password + 'blah'
    })
    .expect(401)
    .end(done)
  })


  it('should not allow a user who is not signed up to login', function(done) {
    server
    .post('/login')
    .send({
      username: 'blahblabla',
      password: 'blahblablapass'
    })
    .expect(401)
    .end(done)
  })

  after(function(done) {
    User.remove({username: userOne.username}).exec()
    done();
  })

});