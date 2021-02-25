var express = require("express");
var logger = require("morgan");
const path = require('path'); // to serve specific files whennroutes are hit
var mongoose = require("mongoose");

var PORT = 3000;

var User = require("./userModel.js");

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/socketUsers", { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res, next) => {
  User.find({})
  .then(function(dbTweet) {
    res.json(dbTweet);
  })
  .catch(function(err) {
    res.json(err);
  });
});


app.post("/", function(req, res) {

  User.create(req.body)
    .then(function(tweet) {
      res.sendFile(path.join(__dirname, '/public', '/hidden.html'));
    })
    .catch(function(err) {
    
      res.send( err.message + '\n\n <h1> Please hit the back button and try again</h1>')
     
    
    });
    
    
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
