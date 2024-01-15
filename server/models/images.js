const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({

    imageUrl: {
        type: String,
    },
    userId:{
        type: String

    },
    countryIso:{
        type: String
    },
    stateIso:{
        type: String
    },
    city:{
        type: String
    },
    latitude: {
        type: String
    },
    longitude:{
        type: String
    },
    discription: {
        type:String
    }
});


module.exports = mongoose.model('Image', ImageSchema);