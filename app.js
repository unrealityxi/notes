const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

// configs for yargs 
const titleOptions = {
            describe: "Title of note",
            demand: true,
            alias: "t"
        }
const bodyOptions = {
            describe: "Adds a body of a note",
            demand: true,
            alias: "b"
        }

// Configures yargs
const argv = yargs

    // set up and describe all of commands
    .command("add", "Add a new note", {
        title: titleOptions, 
        body: bodyOptions
    })
    .command("list", "List all notes")
    .command("read", "Reads a note", {
        title: titleOptions
    })
    .command("remove", "removes a note",{
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

// Handle add command logic
if (command === "add"){

    var note = notes.addNote(argv.title, argv.body);

    // If note was added
    if (note){
        // print out the note
        console.log("Added the following note: ");
        notes.logNote(note);
    } else {
        console.log("Note already exists");
    }
} 
// Lists all notes
else if (command === "list"){
    // fetches all of existing notes
    var allNotes = notes.getAll();

    // Logs each note
    console.log(`Printing ${allNotes.length} notes`); 
    allNotes.forEach((note) => notes.logNote(note));
}

// Reads note
else if (command === "read") {
    // Get note with the provided title
    var note = notes.getNote(argv.title);

    // if note exists, log it
    if (note){
        notes.logNote(note);
    } else {
        console.log(`Note does not exist`);
    }
}
// Removes note
else if (command === "remove") {
 
    // attempt to delete note
    var deleted = notes.removeNote(argv.title);
    
    if (deleted){
        console.log(`Succesfully removed ${argv.title}` );
    } else {
        console.log(`${argv.title} does not exist`);
    }
}
else {
    console.log("Command not recognized");
}