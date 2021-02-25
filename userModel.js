var mongoose = require("mongoose");


var Schema = mongoose.Schema;



var UserModel = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Name is Required",
    validate: [
      function(input) {
        return input.length >= 3;
      },
      "username should be longer."
    ]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    
  },                                          
  tweetTime: {
    type: Date,
    default: Date.now
  }
});






















var User = mongoose.model("Users", UserModel);

module.exports = User;
