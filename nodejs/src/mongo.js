//System Leader Boolean Value
var systemLeader = false;

//Add Required Libraries
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const express = require('express')

//Get Hostname
const os = require("os");
var myhostname = os.hostname();

//Generate Random Number
var nodeID = Math.floor(Math.random() * (100 - 1 + 1) + 1);

//Connection String to Connect to Mongo Servers
const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/NotFLIXDB?replicaSet=rs0';

//Connect to Cluster
app.use(bodyParser.json());
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;

//used to parse the server response from json to object.
const bodyParser = require('body-parser');

//Creation of Schema for NotFLIX
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

//Each Node Sends an Alive Message 
asetInterval(function () {
  amqp.connect('amqp://test:test@192.168.56.10', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'logs';
      var msg =  'Node ALive With ID:' + nodeID;
      channel.assertExchange(exchange, 'fanout', {
        durable: false
      });
      channel.publish(exchange, '', Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
    
      setTimeout(function() {
        connection.close();
      }, 500);
    });

    //Nodes Subsrcibe to Message Queue
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
