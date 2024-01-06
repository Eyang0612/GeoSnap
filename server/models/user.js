const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    _id:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type:String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);