var express = require("express");
var exhandlebars = require("express-handlebars")
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


// Require all models
var app = express();
var db = require("./models");
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


// Configure middleware

// var routes = require('./controllers/newscontroller.js');
// app.use(routes);

app.engine("handlebars", exhandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res){
  res.render("index");

})

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true });

