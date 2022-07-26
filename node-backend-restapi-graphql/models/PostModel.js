const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    TP_PostId : {
        type: Object
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type:String, 
        required: true
    },
    imageURL: {
        type:String, 
        //required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:'User', //The User Model. Has to be same as the model. Only available in Mongoose
        // type: Object,
        // required: true
        
    },
    
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);