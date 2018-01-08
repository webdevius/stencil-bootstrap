var express = require('express');
var app = express();

// Define the port to run on

let port = process.env.PORT || '3333'

app.use(express.static(__dirname + '/www'));

// Listen for requests
var server = app.listen(port, () =>
    console.log('App is running on port ' + port, '\npath: ' + __dirname + 'www')
);