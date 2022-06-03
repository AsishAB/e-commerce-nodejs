const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    TOI_Order_Id:{
        type: Schema.Types.ObjectId,
        ref:'Order', //The Order Model. Has to be same as the model. Only available in Mongoose
        required:true
    },
    TOI_Product_Id:{
        type: Schema.Types.ObjectId,
        ref:'Product', //The Product Model. Has to be same as the model. Only available in Mongoose
        required:true
    },
    TOI_Product_Price:{
        type:Number,
        required:true
    },
    TOI_Quantity:{
        type:Number,
        required:true
    },
    TOI_Created_On:{
        type:Date,
    }
});


module.exports = mongoose.model("OrderItems", orderItemSchema);