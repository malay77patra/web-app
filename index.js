const express = require('express');
const app = express();
const path = require('path');
//app functionality
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'))
});
app.get('/about', function (req, res) {
  res.send("the about page")
});
//server
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);  
});
