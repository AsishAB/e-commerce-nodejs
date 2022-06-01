const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    TCI_CartId : {
        type:Object
    },
    TCI_Quantity : {
        type:Number,
        required:true
    },
    TCI_ProductId : {
        type: Schema.Types.ObjectId,
        ref:'Product', //The User Model. Has to be same as the model. Only available in Mongoose
        required:true
    },
    TCI_Created_By : {
        type: Schema.Types.ObjectId,
        ref:'User', //The User Model. Has to be same as the model. Only available in Mongoose
        required:true
    }   

});

