var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');
var expect = chai.expect;
var dbIndex = ('../db/index.js')

var db = dbIndex.db
var Game = dbIndex.gameInstanceModel

var testGame = {}

describe('Games', function () {
  it('should return all games', function(done) {
    server
    .get('/games')
    .expect(function(res) {
      console.log(res.body, 'games test res.body');
    })
    .end(function(err, res) {
      if(err) return done(err);
      done();
    })
  })
})
