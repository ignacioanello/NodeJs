const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true          //sanitization
    },
    email: {
        type: String,
        unique: true,       //Con esto no permite que haya 2 mails al momento de save (Si lo pones despues de crear la DB, no se setea el index. Hay que recrearla de nuevo en ese caso)
        required: true,
        trim: true,         //sanitization
        lowercase: true,    //sanitization
        validate(value) { //Custom validations
            if (!validator.isEmail(value))
                throw new Error('email is invalid');
        }
    },
    age: {
        type: Number,
        default: 0,       //sanitization (not mandatory but with default)
        validate(value) { //Custom validations
            if (value < 0)
                throw new Error('Age must be a possitive number');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('You cannot use the word password!');
        }
    },
    tokens: [{ //  Aca haces TRACKING de varios tokens, por lo tanto si haces logout desde un CELULAR, no te deslogueas desde la PC
        token: {
            type: String,
            required: true
        }
    }]
});

//VIRTUAL PROPERTY => NO ES DATA EN LA db, ES UINA RELACION ENTRE 2 ENTIDADES (EN ESTE CASO ENTRE EL USER Y LA TASK)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// userSchema.methods.getPublicProfile = function () { // Used for the manual way of hidding sensitive data

//.toJSON => con esto sobreescribimos el comportamiento por default (stringify) que convierte en JSON (string), pero manipulando el objeto llamador (this).
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); //.toObject() => Converts this document into a plain-old JavaScript object (POJO)

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

// userSchema.methods ==> Accesibles en instancias del Model
userSchema.methods.generateAuthToken = async function () { //Como es uin metodo de instancia, lo creo con 'function' asi tengo acceso al 'this' que acá si se bindea
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', { expiresIn: '2 days' });

    //update token into the User Document.
    user.tokens = user.tokens.concat({ token }); //Agrego el token al array, por si tiene otro de algun otro dispositivo
    await user.save();

    return token;
};

// userSchema.statics ==> Accesibles desde el Model directamente
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) //Es como el findById, pero en vez de un ID le mandamos un objeto con lo que queremos buscar.

    if (!user)
        throw new Error('Unable to login');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
        throw new Error('Unable to login');

    return user;
};

// This hook/middleware, will be executed BEFORE saving a Model
// Musty be a common function because 'this' here is important and arroy function don't bind 'this'
userSchema.pre('save', async function (next) {
    // 'this' it's the user that is about to be saved.
    const user = this;

    //Only hash the pass if was changed for by the user or in a new user (checks mutation/creation of the object property)
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8); //8 es el numero de round para generar generar el salt. Hace 8 randoms (segun autor es el que mejor performance tiene)

    next();
});

//Deletre user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
});


// module.exports = mongoose.model('User', userSchema);
// Si no lo hago de esta manera, no tengo accesso al Model de User dentro del  findByCredentials o cualquier otra function que cree.
const User = mongoose.model('User', userSchema);

module.exports = User;



// Another way, with 'PATH' for validating --------------------------
// userSchema.path('age').validate(function(value) {
//     if (value < 0) {
//       throw new Error('Age must be a possitive number');
//     }
//     // return true;
//   }, "Mensaje de error general");

//   const User = mongoose.model('User', userSchema);
