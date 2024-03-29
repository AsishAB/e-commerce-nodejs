const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema  = new Schema({
    TP_ProductId: {
        type: Object
    },
    TP_Product_Title: {
        type: String,
        required: true
    },
    TP_Product_Description: {
        type:String,
        required: false
    }, 
    TP_Image_URL :{
        type:String,
        required: false,
    },
    TP_Product_Price: {
        type:Number,
        required:true
    },
    TP_Created_By: {
        type: Schema.Types.ObjectId,
        ref:'User', //The User Model. Has to be same as the model. Only available in Mongoose
        required:true
    },
    TP_Updated_By: {
        type: Schema.Types.ObjectId,
        ref:'User', //The User Model. Has to be same as the model. Only available in Mongoose
        //required:true
    }

});

module.exports = mongoose.model('Product', productSchema);