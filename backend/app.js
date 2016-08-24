// dependencies
var express = require('express');

var app = express();

// define supported routes
app.get('/status', function(req, res){
	res.set({
		'Content-Type': 'application/json',
	});
	res.status(200);
	var body = {
		"success":true
	};
	res.send(JSON.stringify(body));
});

// start node app
app.listen(3000);
console.log("Started on port 3000");
