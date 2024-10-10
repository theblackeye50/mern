const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    name: {type:String, required:true},
    Email:{ type:String, required:true},
    country:{type:String, required:true},
    pincode:{type:Number, required:true , max:999999, min:100000}
});

module.exports=mongoose.model('User',userSchema);