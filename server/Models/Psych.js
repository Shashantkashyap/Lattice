const mongoose = require("mongoose");

const psychiatristSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    },
    patients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }
    ],
    
});



module.exports = mongoose.model("Psychiatrist", psychiatristSchema);