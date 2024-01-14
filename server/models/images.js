const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    image: {
        type: String,
    },
    userId:{
        type: String

    },
    location: {
        type: String
    },
    discription: {
        type:String
    }
});


module.exports = mongoose.model('Image', ImageSchema);