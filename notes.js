const fs = require("fs");

var fetchNotes = () => {
    // see if file already exists
    try {
        // if it does, read it
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (e) {
        // if it doesnt, return empty array
        return [];
    }
};

var saveNotes = (notes) => {
    // write our stuff to the file
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

function logNote(note){
    debugger;
    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("---");
}


var addNote = (title, body) => {

    // fetch all notes
    var notes = fetchNotes();
    // set up new note
    var note = {
        title, 
        body
    };

    // check if new note is unique
    var duplicateNotes = notes.filter((note) => note.title === title )
    // if it is, push note to all notes list
    if (duplicateNotes.length === 0) {
        notes.push(note);

        // write notes to file
        saveNotes(notes);
        return note;
    }
}

// gets all notes
var getAll = () => {
    return fetchNotes();
}

// gets specific note
var getNote = (title) => {

    var notes = fetchNotes();

    // filters out non desired notes;
    notes = notes.filter((note) => note.title == title);
    return notes[0];

}

var removeNote = (title) => {
    // fetch the notes
    var notes = fetchNotes();

    // filter notes;
    var filteredNotes = notes.filter((note) => note.title !== title);

    // save new notes array
    saveNotes(filteredNotes);

    return notes.length == filteredNotes.length;
}


module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}
