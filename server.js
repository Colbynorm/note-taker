// Dependencies
var express = require("express");
var path = require("path");
var todo = require("./db/db.json");
var fs = require("fs")

// Set Up Express App
var app = express();
var PORT = 3000;

// Set Up Express App to Handle Data Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



// Create New TODO
app.post("/api/todolist", function(req, res) {
    var newTodo = req.body;
    console.log(newNote);

    // Give  an TODOID
    if(todo.length > 0) {
        var newID = todo[todo.length -1].id + 1
        newTodo.id = newID
    } else {
        newTodo.id = 1;
    }

    todo.push(newTodo);

    fs.writeFileSync("db/db.json", JSON.stringify(todo));

    res.json(newTodo);
});

app.delete("/api/todolist/:id", function(req, res) {
    let id = req.params.id;
    id = parseInt(id);
    // id = +id;
    console.log(id)
    for(let i = 0; i < notes.length; i++){
        if(notes[i].id === id){
            notes.splice(i,1);
        }
    }

    fs.writeFileSync("db/db.json", JSON.stringify(notes));

    res.json(true)
});

// Display's All Notes
app.get("/api/todolist", function(req, res) {
    return res.json(notes)
});

app.get("/todolist", function(req, res) {
    res.sendFile(path.join(__dirname, "public/todoList.html"))
});

app.get("*", function( req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//Start Server
app.listen(PORT, function() {
    console.log("App is listening on PORT" + PORT);
});
