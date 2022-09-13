const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true          //sanitization
    },
    email: {
        type: String,
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
    }
});

// Another way, with 'PATH' for validating --------------------------
// userSchema.path('age').validate(function(value) {
//     if (value < 0) {
//       throw new Error('Age must be a possitive number');
//     }
//     // return true;
//   }, "Mensaje de error general");

//   const User = mongoose.model('User', userSchema);

  module.exports = mongoose.model('User', userSchema);