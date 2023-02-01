let $noteTitle = $(".note-title");
let $saveNoteBtn = $(".save-note");
let $newNoteBtn = $(".new-note");
let $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all todos from the db
let getNotes = function() {
  return $.ajax({
    url: "/api/todolist",
    method: "GET"
  });
};

// A function for saving a todo to the db
let saveNote = function(data) {
  return $.ajax({
    url: "/api/todolist",
    data: data,
    method: "POST"
  });
};

// A function for deleting a todo from the db
let deleteNote = function(id) {
  return $.ajax({
    url: "api/todolist/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
let renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteTitle.val(activeNote.title);
  } else {
    $noteTitle.attr("readonly", false);
    $noteTitle.val("");
  }
};

// Get the todo data from the inputs, save it to the db and update the view
let handleNoteSave = function() {
  let newNote = {
    title: $noteTitle.val(),
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked todo
let handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  let note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the todo and displays it
let handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the todo to and empty object and allows the user to enter a new todo
let handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a todo is empty, hide the save button
// Or else show it
let handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of todo titles
let renderNoteList = function(notes) {
  $noteList.empty();

  let noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    let $li = $("<li class='list-group-item'>").data(note);
    let $span = $("<span>").text(note.title);
    let $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
let getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
