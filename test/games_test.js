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

var randomGame = { 
  gameName: 'randomTest',
  password: '',
  players: [],
  category: 'random',
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
var memeGame = { 
  gameName: 'memeTest',
  password: '',
  players: [],
  category: 'memes',
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
    Game.remove({gameName: randomGame.gameName}).exec();
    Game.remove({gameName: memeGame.gameName}).exec();
    User.remove({username: userOne.username}).exec()
    done();
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

  it('should return a 201 status code after creating a meme game', function(done) {
    server
    .post('/games')
    .send(memeGame)
    .expect(201)
    .end(function(err, res) {
      if(err) return done(err);
      done();
    })
  })

  it('should return a memes game that has been created', function(done) {
    server
    .get('/game?name=' + memeGame.gameName)
    .expect(function(res) {
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].category).to.equal(memeGame.category)
      expect(res.body[0].gameName).to.equal(memeGame.gameName);
      expect(res.body[0].password).to.equal(memeGame.password);
      expect(res.body[0].currentRound).to.equal(memeGame.currentRound);
    })
    .end(function (err, res) {
      if(err) return done(err);
      done();
    })

  })

  it('should return a 201 status code after creating a random game', function(done) {
    server
    .post('/games')
    .send(randomGame)
    .expect(201)
    .end(function(err, res) {
      done();
    })
  })

  it('should return a random game that has been created', function (done) {

    server
    .get('/game?name=' +  randomGame.gameName)
    .expect(function(res) {
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].category).to.equal(randomGame.category)
      expect(res.body[0].gameName).to.equal(randomGame.gameName);
      expect(res.body[0].password).to.equal(randomGame.password);
      expect(res.body[0].currentRound).to.equal(randomGame.currentRound);
    })
    .end(function (err, res) {
      if(err) return done(err);
        done();
    })
  })

})
