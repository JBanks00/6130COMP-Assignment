//Object data modelling library for mongo

//Publisher node interval of 5 seconds

const mongoose = require('mongoose');

//Mongo db client library
//const MongoClient  = require('mongodb');

//Express web service library
const express = require('express')

//used to parse the server response from json to object.
const bodyParser = require('body-parser');

//instance of express and port to use for inbound connections.
const app = express()
const port = 3000

//connection string listing the mongo servers. This is an alternative to using a load balancer. THIS SHOULD BE DISCUSSED IN YOUR ASSIGNMENT.
const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/NotFLIXDB?replicaSet=rs0';

setInterval(function() {

  console.log(`Intervals are used to fire a function for the lifetime of an application.`);

}, 3000);

//tell express to use the body parser. Note - This function was built into express but then moved to a seperate package.
app.use(bodyParser.json());

//connect to the cluster
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var NotFLIXSchema = new Schema({
  AccountID: Number,
  Username: String,
  TitleID: Number,
  UserAction: String,
  DateTime : String,
  PointofInteraction: String,
  TypeofInteraction: String
});

var NotFLIXModel = mongoose.model('Items', NotFLIXSchema, 'items');



app.get('/', (req, res) => {
  NotFLIXModel.find({},'item', (err, stock) => {
    if(err) return handleError(err);
    res.send(JSON.stringify(stock))
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

//bind the express web service to the port specified
app.listen(port, () => {
 console.log(`Express Application listening at port ` + port)
})


//Connect to MongoJS - Subscriber nodes
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://test:test@192.168.56.10', function(error0, connection) {
      if (error0) {
              throw error0;
            }
      connection.createChannel(function(error1, channel) {
              if (error1) {
                        throw error1;
                      }
              var exchange = 'logs';

              channel.assertExchange(exchange, 'fanout', {
                        durable: false
                      });

              channel.assertQueue('', {
                        exclusive: true
                      }, function(error2, q) {
                                if (error2) {
                                            throw error2;
                                          }
                                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                                channel.bindQueue(q.queue, exchange, '');

                                channel.consume(q.queue, function(msg) {
                                            if(msg.content) {
                                                            console.log(" [x] %s", msg.content.toString());
                                                          }
                                          }, {
                                                      noAck: true
                                                    });
                              });
            });
});