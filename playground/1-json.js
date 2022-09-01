const fs = require('fs');

// JS Object
const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday'
}

//El modulo de fileSytem siempre entiende strings (JSON), por eso hay que pasar siempre los JS Objects a JSON (string)
const bookJSON = JSON.stringify(book);
console.log(bookJSON)
console.log(bookJSON.author); // undefined => Does not work because is a string

const bookJSObject =  JSON.parse(bookJSON);
console.log(bookJSObject);
console.log(bookJSObject.author);

fs.writeFileSync('1-json.json', bookJSON);

const fileContent = fs.readFileSync('1-json.json');
const fileContentJSON = JSON.parse(fileContent); //Hay que parsear porque el retorno es un buffer que usa Node para representar binary data
console.log(fileContentJSON); 
console.log(fileContentJSON.title); 

