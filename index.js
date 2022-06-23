const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 8080
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'cxxzaoysyqunzf',
  host: 'ec2-52-71-23-11.compute-1.amazonaws.com',
  database: 'd4279nbdqbq5to',
  password: '20a1e0d208f7e076f515ccaccba2351e6d44bfd4afdbfc8277887e5c311f361f',
  port: 5432,
  ssl: { rejectUnauthorized: false }
})
//config
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//app functionality
app.get('/', function (req, res) {
  pool.query('SELECT sub FROM data', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
//  res.sendFile(path.join(__dirname+'/index.html'))
});
app.get('/data', function (req, res) {
  var id = req.query.id;
  pool.query('SELECT * FROM data WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
});
app.get('/create', function (req, res) {
  var date = req.query.date;
  var sub = req.query.sub;
  var info = req.query.info;
  if (date != undefined && sub != undefined && info != undefined) {
    pool.query('INSERT INTO data (date,sub,info) VALUES ($1, $2, $3)', [date,sub,info], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send("done")
    });
  }else {
  res.send("something is not dedined")
  }
});
app.get('/delete', function (req, res) {
  var id = req.query.id;
  pool.query('DELETE FROM data WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send("deleted succesfully")
  });
});
//server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);  
});
