var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');
var expect = chai.expect;

var dbIndex = require('../db/index.js')
var db = dbIndex.db
var Game = dbIndex.gameInstanceModel
var User = dbIndex.userModel

var testGame = { 
  gameName: 'test',
  password: '',
  players: [],
  rounds: 
   [ { prompt: 'prompt 1',
       responses: [],
       winner: '',
       stage: 0,
       ready: [] },
     { prompt: 'prompt 2',
       responses: [],
       winner: '',
       stage: 0,
       ready: [] },
     { prompt: 'prompt 3',
       responses: [],
       winner: '',
       stage: 0,
       ready: [] },
     { prompt: 'prompt 4',
       responses: [],
       winner: '',
       stage: 0,
       ready: [] } ],
  currentRound: 0 
}

var userOne = {
  username: 'testUserOne', 
  email: 'testUserOne@gmail.com', 
  password: 'testUserOne'
}


describe('Games', function () {

  before(function(done) {
    server.post('/signup')
    .send(userOne)
    .end(function(res, err) {
      done()
    })


  })

  after(function(done) {
    Game.remove({gameName: testGame.gameName}).exec();
    User.remove({username: userOne.username}).exec()
    done();
  })

  it('should return a 201 status code after creating a game', function(done) {
    server
    .post('/games')
    .send(testGame)
    .expect(201)
    .end(function(err, res) {
      done();
    })
  })

  it('should return all games', function(done) {
    server
    .get('/games')
    .send()
    .expect(function(res) {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.length.above(0)
    })
    .end(function(err, res) {
      if(err) return done(err);
      done();
    })
  })

  it('should send back game data when server is sent a game name', function (done) {

    server
    .get('/game?name=' +  testGame.gameName)
    .expect(function(res) {
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(1)
      expect(res.body[0].gameName).to.equal(testGame.gameName)
      expect(res.body[0].password).to.equal(testGame.password)
      expect(res.body[0].currentRound).to.equal(testGame.currentRound)
    })
    .end(function (err, res) {
      if(err) return done(err);
        done();
    })
  })

})
