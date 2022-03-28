//Object data modelling library for mongo

//Subscirber Nodes MongoDB 
systemLeader = 0

//Get the hostname of the node
var os = require("os");
var myhostname = os.hostname();

var nodeID = Math.floor(Math.random() * (100 - 1 + 1) + 1);
toSend = {"hostname" : myhostname, "status": "alive","nodeID":nodeID} ;

//based on the interval publish a status message 
setInterval(function() {
  console.log("sending alive");
  sock.send(["status", JSON.stringify(toSend)]);
}, 500);


//check if leader
setInterval(function() {
  console.log(JSON.stringify(nodes));
  leader = 1;
  activeNodes = 0;
  Object.entries(nodes).forEach(([hostname,prop]) => {
    console.log("test" + JSON.stringify(hostname) + JSON.stringify(prop) )
    maxNodeID = nodeID;
    if(hostname != myhostname){
      if("nodeID" in prop){
        activeNodes++;
        if(prop.nodeID > nodeID)
        {
          leader = 0;
        }
      }
    }
    if((leader == 1) && (activeNodes == (nodes.length - 1)))
    {
      systemLeader = 1;
    }
  });
}, 2000);

//for each key value in nodes
Object.entries(nodes).forEach(([hostname,prop]) => {
  
    //print the hostname IP
    console.log("hostname = " + hostname + " ip = " + prop.ip);
//create a number of subscribers to connect to publishers
    var subsockets = [];
    if(myhostname != hostname ){
        tempsoc = zmq.socket("sub");
        tempsoc.connect("tcp://" + prop.ip + ":3000");
        tempsoc.subscribe("status");
        console.log("Subscriber connected to port 3000 of " + hostname);
        tempsoc.on("message", function(topic, message) {
          jsonMessage = JSON.parse(message.toString("utf-8"));
            console.log(
            "received a message from " + hostname + " related to:",
            topic.toString("utf-8"),
            "containing message:",
            jsonMessage.status + " with ID" + jsonMessage.nodeID
            );
            nodes[hostname].nodeID =  jsonMessage.nodeID;
        });
        //push this instance of a sub socket to the list.
        subsockets.push(tempsoc);
    }
});


db.open(function(err) {
    if (err) throw err;

    db.collection('messages', function(err, collection) {
        if (err) throw err;

        var latest = collection.find({}).sort({ $natural: -1 }).limit(1);

        latest.nextObject(function(err, doc) {
            if (err) throw err;

            var query = { _id: { $gt: doc._id }};
            
            var options = { tailable: true, awaitdata: true, numberOfRetries: -1 };
            var cursor = collection.find(query, options).sort({ $natural: 1 });

            (function next() {
                cursor.nextObject(function(err, message) {
                    if (err) throw err;
                    console.log(message);
                    next();
                });
            })();
        });
    });
});

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
