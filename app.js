//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const { first } = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));







app.get("/", function (req, res) {

  res.render("home");
});

app.get("/about", function (req, res) {

  res.render("about");
});
app.get("/contact", function (req, res) {

  res.render("contact");
});
app.get("/gallery", function (req, res) {

  res.render("gallery");
});
app.get("/special-discount", function (req, res) {

  res.render("special-discount");
});

app.get("/cart", function (req, res) {

  res.render("cart");
});

app.get("/signup", function (req, res) {

  res.render("signup");
});




//POST request
app.post("/signup", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;


  const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName

              }



          }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/b408717c49";

  const options = {
      method: "POST",
      auth: "sabiha29:086f438288e22314adf4350824c3f068-us21"
  }

  const request = https.request(url, options, function (response) {


      if (response.statusCode === 200) {
          res.sendFile(__dirname + "/");
      } else {
          res.sendFile(__dirname + "/failure.html");
      }


      response.on("data", function (data) {
          console.log(JSON.parse(data));
      })


  })

  request.write(jsonData);
  request.end();
});

app.get("/package", function (req, res) {

  res.render("package");
});

app.get("/cosmetics", function (req, res) {

  res.render("cosmetics");
});

app.get("/facilities", function (req, res) {

  res.render("facilities");
});

app.get("/services", function (req, res) {

  res.render("services");
});

app.get("/payment", function (req, res) {

  res.render("payment");
});

//POST request
app.post("/payment", function (req, res) {
  const cardName = req.body.fName;
  const cardno = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;


  const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: cardName
                 

              }



          }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/b408717c49";

  const options = {
      method: "POST",
      auth: "sabiha29:086f438288e22314adf4350824c3f068-us21"
  }

  const request = https.request(url, options, function (response) {


      if (response.statusCode === 200) {
          res.sendFile(__dirname + "/pay.html");
      } else {
          res.sendFile(__dirname + "/failure.html");
      }


      response.on("data", function (data) {
          console.log(JSON.parse(data));
      })


  })

  request.write(jsonData);
  request.end();
});





//use express app to listen on 3000 and log when it's working
app.listen(3000, function () {
  console.log("Server is running on port 3000.")
});


// API key
// 086f438288e22314adf4350824c3f068-us21

// List Id
// b408717c49







