const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js")

var tasks = [];
var workTasks = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", (req, res) => {

   let day = date();
    res.render("list", { listTitle: day, addedTasks: tasks })

})

app.post("/", (req, res) => {

    
    var task = req.body.nextTask;
    
    if(req.body.list === "Work List" ){
        workTasks.push(task);
        res.redirect("/work");
    }
    else{
        tasks.push(task); 
        res.redirect("/")
    }
   
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", addedTasks: workTasks })
})

app.get("/about" , (req , res) => {
    res.render("about")
})

app.listen(5000, () => {
    console.log("server  running at 5000 port")
})