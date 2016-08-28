// dependencies
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var url = 'http://' + process.env.DBFACADE_PORT_3000_TCP_ADDR + ':' + process.env.DBFACADE_PORT_3000_TCP_PORT

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

	request.post({
		headers: {'content-type' : 'application/json'},
		url:url + '/todo/entries',
		body:JSON.stringify(req.body)
	}, function(error, response, body){
		if(!error) {
			res.status(201).set({
				'Content-Type': 'application/json',
			}).send({"success":true});
		}
		else {
			res.status(500).json({"success":false, "debug": + body});
		}
	});
});

app.get('/middleware/todos', function(req, res) {
	request.get({
		url:url + '/todo/entries',
	}, function(error, response, body){
		if(!error) {
			res.status(200).set({
				'Content-Type': 'application/json',
			}).send(body);
		}
		else {
			res.status(500).send({"success":false, "debug": + body});

		}
	});
});

// start node app
app.listen(3000);
console.log("Started on port 3000");
