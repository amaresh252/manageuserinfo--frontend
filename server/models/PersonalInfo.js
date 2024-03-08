const mongoose=require('mongoose');

const personalinfo=mongoose.Schema({
    name:{type:String},
    phone:{type:Number},
    email:{type:String},
    hobbies:{type:String},
})

exports.PersonalInfo=mongoose.model('PersonalInfo',personalinfo);