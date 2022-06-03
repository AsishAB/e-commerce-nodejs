const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    TO_Order_Id:{
        type:String,
        required:true
    },
    TO_User_Id:{
        type: Schema.Types.ObjectId,
        ref:'User', //The User Model. Has to be same as the model. Only available in Mongoose
        required:true
    },
    TO_Net_Price:{
        type:Number,
        required:true
    },
    TO_Shipping_Cost:{
        type:Number,
        required:true
    },
    TO_Total_Price:{
        type:Number,
        required:true
    },
    TO_Coupon_Code:{
        type:String,
        
    },
    TO_Created_On:{
        type:Date,
        required:true
    }
});


module.exports = mongoose.model("Order", orderSchema);