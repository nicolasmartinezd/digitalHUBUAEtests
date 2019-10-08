"use strict"
const fs = require('fs');
const data = fs.readFileSync('./data.json');
const dataObject = JSON.parse(data);
var assert = require('assert');
var request = require('supertest');
//var firstboardid = 'grrr';

var request = request("https://api.trello.com")

describe('get boards', function(){
    it('Should return json all boards information includin board ids', function(done){
        request.get('/1/members/me/boards?key='+ dataObject.trello.apikey + '&token=' + dataObject.trello.token)
            .expect('Content-Type', /json/)
            .expect(200, done())
            .end(function(err, res) {
                var responsedata = JSON.parse(JSON.stringify(res.body));
                console.log(responsedata[0].name);
                console.log(responsedata[0].id);
            });
    });
});

describe('Get lists from a board', function(){
    it('Should return json all lists contained in a board', function(done){
        request.get('/1/boards/' + dataObject.trello.firstboardid + 'lists/?key=' + dataObject.trello.apikey + '&token=' + dataObject.trello.token)
            .expect('Content-Type', /json/)
            .expect(200, done())
            .end(function(err, res) {
                if (res) console.log(res.body);
                console.log('/1/boards/' + dataObject.trello.firstboardid + '/lists/?key=' + dataObject.trello.apikey + '&token=' + dataObject.trello.token)
                //var responsedata = JSON.parse(JSON.stringify(res.body));
                //firstboardid = responsedata[0].id;
            });
    });
});
