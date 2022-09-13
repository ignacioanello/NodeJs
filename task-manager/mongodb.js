//ESte NPM paquete es un driver nativo creado por MongoDB que te permite conectarte a MongoDB desde NodeJS. (Directo, nada de mongoose).
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const { MongoClient, ObjectId, Db } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// ObjectId
// const id = new ObjectId();
// console.log('id', id.toString());
// console.log('id.id', id.id);
// console.log('id.id.length', id.id.length);
// console.log('id.toHexString().length', id.toHexString().length);
// console.log('id.toHexString()', id.toHexString());

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error)
        return console.log('Unable to connect to DB');

    //Con accederlo directamente, me crea la DB y me devuelve una referencia a la misma.
    const db = client.db(databaseName)

    // collection = table
    // document   = row
    // field      = column


    // UPDATE ONE
    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectId('631224561a57ba23e54bf983')
    //     },
    //     {
    //         $set: { //Update Oparators
    //             name: 'Ramon',
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     }).then(updatedDocument => {
    //         console.log('Result => modifiedCount: ', updatedDocument.modifiedCount);
    //     });

    // UPDATE MANY
    // db.collection('tasks').updateMany({ completed: false },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }).then(updatedDocument => {
    //         console.log('Result => modifiedCount: ', updatedDocument.modifiedCount);
    //     });


    // // DELETE ONE
    // db.collection('users').deleteOne({ _id: new ObjectId('631224561a57ba23e54bf984') })
    //     .then(result => console.log(result));

    // // DELETE MANY
    db.collection('tasks').deleteMany({ completed: false })
        .then(result => console.log('Deleted count: ', result.deletedCount));

    // FIND ONE -------------------------------------
    // (Si se busca un documento y no se encuentra devuelve NULL, pero NO ES un error)
    // Si se busca 1 solo por ID, tiene que ser del type ObjectId(), no puede ser un string directo.
    // db.collection('users').findOne({ _id: new ObjectId("631224561a57ba23e54bf982") }, (error, result) => {
    //     if (error)
    //         console.log('Unable to fetch!');

    //     console.log('User found', result);
    // });

    // FIND (return all documents that match, RETORNA UN CURSOR) -------------------------------------
    // Does no have callback. Return a cursor thay is a pointer to that data on the DB
    //{ $gt: 39 } ===> greater than 39 (Comparison Query Operators)
    // db.collection('users').find({ age: { $gt: '39' } }).toArray((error, result) => {
    //     if (error)
    //         console.log('Error when trying to fetch!');

    //     console.log(result)
    // });

    //count() - DEPRECATED (db.collection('').countDocuments()) -------------------------------------
    // db.collection('users').find({ age: 41 }).count((error, result) => {
    //     console.log(result)
    // });

    // db.collection('users').countDocuments({ age: 41 }).then((count) => {
    //     console.log(count)
    // });

    // SORT -------------------------------------
    // db.collection('tasks').find()
    //     .sort({ _id: 1 })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     });

    // INSERT ONE -------------------------------------
    // db.collection('users').insertOne({
    //     name: 'Nacho',
    //     age: 39
    // }, (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert user');

    //     console.log(result.insertedId);
    // });

    //INSERT MANY -------------------------------------
    // db.collection('users').insertMany([{
    //     name: 'Nacho',
    //     age: 39
    // },
    // {
    //     name: 'Juan',
    //     age: 40
    // },
    // {
    //     name: 'Edu',
    //     age: 41
    // }], (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert users');

    //     console.log('Amount inserted:', result.insertedCount);
    //     console.log('Users inserted IDs', result.insertedIds);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task 1',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: false
    //     },
    //     {
    //         description: 'Task 3',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert tasks');

    //     console.log('Amount of tasks inserted:', result.insertedCount);
    //     console.log('Inserted tasks IDs', result.insertedIds);
    // });


    console.log('Connected Correctly');
});

