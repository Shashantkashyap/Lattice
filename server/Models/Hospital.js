const mongoose = require("mongoose");

const hospitalSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    psychiatrists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Psychiatrist"
        }
    ],
    patients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }
    ]

});



module.exports = mongoose.model("Hospital", hospitalSchema);