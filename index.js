const express = require('express')
var cors = require('cors')
const app = express()
var cluster = require('cluster');

const mongoose = require('./config/database')
const apiRouter = require('./src/index')
var bodyParser = require('body-parser')
const port = 8000
app.use(cors())
require('dotenv').config()
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.get('/',(req,res) =>{
  res.send("hello")
})

app.use('/',apiRouter)
if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
      cluster.fork();
  }

  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
