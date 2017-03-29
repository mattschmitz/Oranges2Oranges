var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');
var expect = chai.expect;

describe('testroute1', function() {
  it('should accept signup', function(done) {
    server
    .get('/testroute1')
    .expect(200)
    .end(done);
  });
});



