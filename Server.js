var express = require("express");
var multer = require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded());


/* Configure the database*/
var connectionUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/f360';
mongoose.connect(connectionUrl);

/*Run the server.*/

var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipAddress);

require("./Server/app.js")(app, mongoose);