const mongoose = require('mongoose');

const express = require('express')

const bodyParser = require('body-parser');

const app = express()
const port = 3000

const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/sweetShopDB?replicaSet=rs0';

setInterval(function() {

  console.log(`Intervals are used to fire a function for the lifetime of an application.`);

}, 3000);

app.use(bodyParser.json());

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var NotFLIX_Schema = new Schema({
  AccountID: Number,
  Username: String,
  TitleID: Number,
  UserAction: String,
  DateTime: Date,
  PointofInteraction: String,
  TypeofInteraction: String
});

var NotFLIX_Model = mongoose.model('Items', NotFLIX_Schema, 'items');

app.get('/', (req, res) => {
  NotFLIX_Model.find({},'Item', (err, item) => {
    if(err) return handleError(err);
    res.send(JSON.stringify(item))
  }) 
})

app.post('/',  (req, res) => {
  var awesome_instance = new SomeModel(req.body);
  awesome_instance.save(function (err) {
  if (err) res.send('Error');
    res.send(JSON.stringify(req.body))
  });
})

app.put('/',  (req, res) => {
  res.send('Got a PUT request at /')
})

app.delete('/',  (req, res) => {
  res.send('Got a DELETE request at /')
})

app.listen(port, () => {
 console.log(`Express Application listening at port ` + port)
})

