const express=require('express');
const mongoose=require('mongoose');

userSchema=mongoose.Schema({
    name:{type:String , required:true},
    color:{type:String , required:true},
    price: {type:String, required:true},
    image: {type:String, required:true}
})

module.exports = mongoose.model('Device', userSchema);
