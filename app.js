
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');

const app = express();
// console.log(__dirname);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.set("view engine" , "ejs");

let items = ["Item 1" , "Item 2"];
let workItems = ["work1" , "work2"];

app.get("/", function(req,res){
  // res.send("Server is up and running.");



  let day = date();
  // var currentDay = today.getDay();
  // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // var day = ""
  // switch (currentDay) {
  //   case 0: day = days[0];
  //   break;
  //   case 1: day = days[1];
  //   break;
  //   case 2: day = days[2];
  //   break;
  //   case 3: day = days[3];
  //   break;
  //   case 4: day = days[4];
  //   break;
  //   case 5: day = days[5];
  //   break;
  //   case 6: day = days[6];
  //   break;
  //   default: console.log("There is an Error");
  // }

  res.render("list", {
    givenDay : day ,
     nextItems : items
   });
});

app.get("/work", (req,res) =>{
  res.render("list", {givenDay : "Work List" , nextItems : workItems});
})


app.post("/", function(req,res){
  console.log(req.body);

  let a = req.body.listItem;

    if (req.body.send === "Work"){
      workItems.push(a);
      res.redirect("/work")
    }else{
      items.push(a);
      res.redirect("/");
    }
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.......");
});
