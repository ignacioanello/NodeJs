const fs = require('fs');
const chalk = require('chalk');

const FILE_NAME = 'notes.json';

const listNotes = () => {
    console.log(chalk.bgGrey('Your Notes:'));

    for (const note of loadNotes()) {
        console.log(`Title: ${note.title}`);
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    //filter() como devuelve un array, no corta al encontrar un match, sino que sigue hasta el final... y si son 1000 objetos, no es optimo
    //const duplicatedNotes = notes.filter(note => note.title === title);

    // if (duplicatedNotes.length > 0) {
    //     console.log(chalk.bgRed('Note already exists with that title!'));
    //     return;
    // }

    //find() corta la ejecucion al encontrar algun match
    const duplicatedNote = notes.find(note => note.title === title);

    if (duplicatedNote) {
        console.log(chalk.bgRed('Note already exists with that title!'));
        return;
    }

    notes.push({ title, body });
    saveNotes(notes);

    console.log(chalk.bgGreen('New note added!'));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);

    //Check if a note was removed comparing the length of both arrays
    if (notes.length === newNotes.length) {
        console.log(chalk.bgRed('No not found!!!'));
        return;
    }

    saveNotes(newNotes);
    console.log(chalk.bgGreen('Note Removed!!!'));
}

const readNote = (title) => {
    const notes = loadNotes();
    const selectedNote = notes.find(note => note.title = title);

    if (!selectedNote) {
        chalk.bgRed(console.log('Could not find note with the given title.'));
        return;
    }

    console.log(`Title: ${chalk.bgBlue(selectedNote.title)}`);
    console.log(`Body: ${selectedNote.body}`);

};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(FILE_NAME));
    }
    catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(notes));
};

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
}