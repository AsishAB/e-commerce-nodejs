//const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    TRP_Registered_UserId : {
        type:String,
        required: true
    },
    TRP_Token : {
        type:String,
        required: true
    },
    TRP_Token_ExpiresOn : {
        type:Date,
        required: true
    },
    TRP_PasswordRequest_Date : {
        type:Date,
        required: true
    }
    
});


module.exports = mongoose.model("ResetPassword" , resetPasswordSchema)