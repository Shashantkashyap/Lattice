const express = require("express");
const app = express();
require("dotenv").config();
const {dbConnect} = require("./config/db");
const Router = require("./Routes/route");
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload")
const cors = require("cors")

const Port = process.env.PORT;
dbConnect();
cloudinaryConnect();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api",Router);

app.get("/", (req,res)=>{
    res.status(200).json("This is home page")
});

app.listen(Port, ()=>{
    console.log(`app is listening on port no ${Port}`)
})
