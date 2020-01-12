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

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.engine("handlebars", exhandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsscraper", {
  useNewUrlParser: true
});

// var routes = require('./controllers/newscontroller.js');
// app.use(routes);

// Routes
app.get("/", function (req, res) {
  res.render("index");

})

app.get("/scrape", function (req, res) {
  axios.get("https://www.seattletimes.com/business/").then(function (response) {

    var $ = cheerio.load(response.data);

    $("ul li").each(function (i, element) {
      var result = {};
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    res.send("Scrape Complete");
  });
});

app.get("/articles", function (req, res) {
  db.article.find({}).then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});