// -- VALIDATOR (Validar de todo tipo de cosas, ver doc en npm)
// const validator = require('validator');
// const ok = validator.isJWT('');
// const ok = validator.isEmail('pepe@oeoe.com');

// -- CHALK (Dar formato a los mensajes de consola, color, background, etc)
// const chalk = require('chalk');
// console.log(chalk.blue.underline.bold('with a blue substring'));
// console.log(chalk.blue('Hello!!'));
// console.log(chalk.bgGreen.bold('Success!!'));

// const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This is the text');
// fs.appendFileSync('notes.txt','esto es por medio de appendFileSync()');

// Process parameters
// console.log('process', process.argv);

// -- DEBUGGING (Agregando 'inspect' al ejecutar y teniendo un debugger si se quiere)
// node inspect app.js add --title="z" --body="sss"
// Ir al Chrom y poner en la URL => chrome://inspect
// Tambien podemos agregar en la pestaña de File System el working directory, para poder ver TODOS los archivos.
// al cerrar el el DevTools, si es necesario ejecutarlo de nuevo, en la terminal del VSCode poner 'restart'

const { addNote, listNotes, removeNote, readNote } = require('./notes');
//const notes = require('./notes'); //Object with 2 props

//-- YARGS 
const yargs = require('yargs');

yargs.version('1.1.0');

// (Con node app.js --help, podemos ver los comandos registrados)

// Create 'add' command (node app.js add --title="NOTE TITLE!!!" --body="BODY DESCRIPTION")
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: { //Construir el objeto con las propiedades de input
        title: {
            describe: 'Note Title',
            demandOption: true, //make property mandatory
            type: 'string' //Make sure that is string. If empty is bool
        },
        body: {
            describe: 'This is the body of the Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const { title, body } = argv;
        addNote(title, body);
    }
});

// Create 'remove' command 
yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const { title } = argv;
        removeNote(title);
    }
});

//Create 'list' command 
yargs.command(
    'list',
    'List notes',
    () => {
        listNotes();
    });

// Create 'read' command 
yargs.command(
    'read',
    'Read notes',
    {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    (argv) => {
        const { title } = argv;
        readNote(title);
    });

// Cuando se accede al argv de yards, realiza el parseo de los argumentos. Para no tener que ejecutar eso, hay otra manera que es mediente el parse()
// console.log(yargs.argv);
yargs.parse();
