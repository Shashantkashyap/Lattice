const mongoose = require("mongoose");

const patientSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    hospital:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        },
    psychiatrist:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Psychiatrist"
        }
    

});



module.exports = mongoose.model("Patient", patientSchema);