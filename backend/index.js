var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var uuid = require('uuid');
app.use(cors());
app.use(express.static(__dirname + '/public'));
const fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
var mysql = require('./database.js').pool;
app.use(fileUpload());
require('./products.js')(app);
require('./seller.js')(app);
app.listen(3001, function () {
  console.log('Example app listening on port 3001!')})