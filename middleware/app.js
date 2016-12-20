// dependencies
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = 'mongodb://db:27017/project';
var db;

// define supported routes
app.get('/middleware/status', function(req, res){
	res.set({
		'Content-Type': 'application/json',
	});
	res.status(200);
	var body = {
		"success":true
	};
	res.send(JSON.stringify(body));
});

app.post('/middleware/todos', function(req, res) {
	var collection = db.collection('todos');
	try {
		collection.insertOne(req.body);
		res.status(201).set({
			'Content-Type': 'application/json',
		}).send({"success":true});
	}
	catch (e) {
		res.status(500).json({"success":false, "debug": e});
	}
});

app.get('/middleware/todos', function(req, res) {
	var collection = db.collection('todos');
	collection.find({}).toArray(function(err, docs){
		if(!err) {
			res.status(200).set({
				'Content-Type': 'application/json',
			}).send(docs);
		}
		else {
			res.status(500).send({"success":false, "debug": err});
		}
	});
});

MongoClient.connect(mongoUrl, function(err, database) {
	assert.equal(null, err);
	// start node app
	db = database;
	app.listen(3000);
	console.log("Started on port 3000");
});

