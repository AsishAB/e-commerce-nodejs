const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({

});


module.exports = mongoose.model("ResetPassword" , resetPasswordSchema)