var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:3000');
// var server = request('https://OURAPPNAME.herokuapp.com');
var expect = chai.expect;
var dbIndex = ('../db/index.js')

var db = dbIndex.db
var Game = dbIndex.gameInstanceModel

,
