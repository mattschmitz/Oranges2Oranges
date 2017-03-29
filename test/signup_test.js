var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');
var expect = chai.expect;
var dbIndex = require('../db/index.js');

var db = dbIndex.db
var userModel = dbIndex.userModel

var userOne = {
	username: 'justinisgreat', 
	email: 'justinisgreat@gmail.com', 
	password: 'justinisgreat'
}

var userTwo = {
	username: 'userLobby', 
	email: 'userLobby@gmail.com', 
	password: 'userLobby'
}

after(function(done) {
	userModel.remove({username: userOne.username}).exec()
	done();
})

describe('user sign up', function() {
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

  it('should add a user to database', function (done) {
		userModel.findOne({username: userOne.username})
		.exec(function (err, found) {
			expect(found.username).to.equal(userOne.username);
			expect(found.email).to.equal(userOne.email);
			done()
		})
  })

  it('should not allow a username to be signed up twice', function (done) {
    server
		.post('/signup')
		.send(userOne)
		.expect(400)
		.end(function(err, res) {
			if(err) return done(err);
			done();
		})
  })

  it('should respond with an error status of 400 when username field is empty', function (done) {
  	server
  	.post('/signup')
  	.send({
			username: '', 
			email: 'justinisjustokay@gmail.com', 
			password: 'justinisjustokay'
		})
		.expect(400)
		.end(function(err, res) {
			if(err) return done(err);
			done();
		})
  })

  it('should respond with an error status of 400 when password field is empty', function (done) {
  	server
  	.post('/signup')
  	.send({
			username: 'justinisaverage', 
			email: 'justinisaverage@gmail.com', 
			password: ''
		})
		.expect(400)
		.end(function(err, res) {
			if(err) return done(err);
			done();
		})
  })

  it('should redirect to /lobby', function(done) {
  	server
  	.post('/signup')
  	.send(userTwo)
  	.expect('Location', '/lobby')
  	.end(function(err, res) {
  		done()
  	})
  })

})


