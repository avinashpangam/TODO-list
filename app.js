
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');
const mongoose=require('mongoose')
// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://avinash:jee2018adv@cluster0.ph58y.mongodb.net/todolistDB");
const todoSchema=new mongoose.Schema({
  name:String
})

const todo=mongoose.model("todo",todoSchema)
const app = express();
// console.log(__dirname);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.set("view engine" , "ejs");


// let items = ["Item 1" , "Item 2"];
// let workItems = ["work1" , "work2"];
const item1= new todo({
  name:'item1'
 
})
const item2= new todo({
  name:'item2'
 
})


const day=date();
app.get("/", function(req,res){
  todo.find(function(err,result){
    if(result.length===0)
    {
        todo.insertMany([item1,item2],(err)=>{
  if(err)
  {
    console.log(err)
  }
})
  res.redirect('/')
    }
    else
    {
        const day=date()
        res.render("list",{
          givenDay: day,
          nextItems:result
        })
    }
  })
});

const listSchema={
  name:String,
  items:[todoSchema]
}
const List=mongoose.model("List",listSchema)

app.get("/:newone", (req,res) =>{
   const newlistname=req.params.newone

   List.findOne({name:newlistname},(err,result)  =>{
     if(err)
     {
           console.log(err)
     }
     else if(!result)
     {
      const List1=new List({
        name:newlistname,
        items:[item1,item2]
    })
    List1.save();
    res.redirect('/'+ newlistname)
     }
     else
     {
       res.render("list",{givenDay:result.name ,nextItems:result.items})
       
     }
   }
   )
 
})


app.post("/", function(req,res){
  console.log(req.body);

  const newtodo = req.body.listItem;
    const  check1   =req.body.send;  
    const newone=new todo({
      name: newtodo
    })
  if(check1.slice(0,3)==day.slice(0,3)){
  
  newone.save()
  res.redirect("/")
}
else
{
  List.findOne({name:check1},(err,result)=>{
    result.items.push(newone)
    result.save()
    res.redirect('/' +check1)
  })
}
});
app.post('/delete',(req,res)=>{
    const a=req.body.checkbox
    const {customlist}=req.body
    console.log(a)
    const day=date()
    if(customlist.slice(0,7)===day.slice(0,7))
   { todo.findByIdAndRemove(a,(err)=>{
      if(err)
      {
        console.log(err)
      }
      else
     { console.log('deleted')
      res.redirect("/")
    }
  
 
    });
  }
  else
  {
     List.findByIdAndUpdate(
       {
         name:customlist
       },
       {
         $pull:{items :{_id:a}}},
         (err,result) =>{
           if(!err)
           {
             res.redirect("/" + customlist)
           }
         }
       
     )
  }
    
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.......");
});
