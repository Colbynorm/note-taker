// Dependencies
var express = require("express");
var path = require("path");
var notes = require("./db/db.json");
var fs = require("fs")

// Set Up Express App
var app = express();
var PORT = 3000;

// Set Up Express App to Handle Data Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



// Create New Note
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);

    // Give Note an ID
    if(notes.length > 0) {
        var newID = notes[notes.length -1].id + 1
        newNote.id = newID
    } else {
        newNote.id = 1;
    }

    notes.push(newNote);

    fs.writeFileSync("db/db.json", JSON.stringify(notes));

    res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
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
app.get("/api/notes", function(req, res) {
    return res.json(notes)
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("*", function( req, res) {
    res.sendfile(path.join(__dirname, "public/index.html"))
});

//Start Server
app.listen(PORT, function() {
    console.log("App is listening on PORT" + PORT);
});
