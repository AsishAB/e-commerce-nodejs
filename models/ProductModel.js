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
        type:Object,
        required:false
    },

});

module.exports = mongoose.model('Product', productSchema);