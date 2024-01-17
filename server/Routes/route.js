const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const OTP = require("../Models/OTP");
const Hospital = require("../Models/Hospital");
const Psychiatrist = require("../Models/Psych");
const Patient = require("../Models/Patient");
const { body, validationResult } = require("express-validator");
const otpGenerator = require("otp-generator")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const jwt = require("jsonwebtoken");

// generate otp
router.post("/otp", async (req, res) => {
    try {
      const { email } = req.body;
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
  
      const otpPayload = { email, otp };
      
      const otpBody = await OTP.create(otpPayload);
  
      
      res.status(200).json({
        success: true,
        message: "otp sent successfully",
        otp,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error in sending OTP",
      });
    }
  }
  )


//psychiatrist login

router.post("/login", async (req, res) => {
  const { name, email, hospitalName, otp } = req.body;

  if (!name || !hospitalName || !email || !otp) {
    return res.status(404).json({
      success: false,
      message: "All feilds a required",
    });
  }

  const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  
  if (recentOtp.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Otp not found",
    });
  } else if (otp !== recentOtp[0].otp) {
    return res.status(400).json({
      success: false,
      messsage: "Invalid OTP",
    });
  }

  const token = jwt.sign({email},process.env.JWT_SECRET,{
    expiresIn:"2h"
  })

  //console.log(token)

  const pDetails = await Psychiatrist.findOne({email:email});

 // console.log(pDetails);
  if(pDetails){
    return res.status(200).json({
      success:true,
      message:"You are registered please proceed",
      token
    })
  }

  const psyc = await Psychiatrist.create({
    name,
    email,
    hospitalName,
  });

  console.log("PSYCHIATRIST", psyc)

  const hospitalData = await Hospital.findOne({name:hospitalName})
  try{
    if (!hospitalData) {
        const hData = await Hospital.create({
          name: hospitalName,
          psychiatrists: psyc._id,
        });

        return res.status(200).json({
            success: true,
            message:"Psychiatrist signup successfully",
            hData
          })
        
      } else {
         await Psychiatrist.findByIdAndUpdate(
           hospitalData._id ,
          {
            $push: {
              psychiatrists: psyc._id,
            },
          },
          { new: true }
        );

        const hdata = await Psychiatrist.find({hospitalName});

        return res.status(200).json({
            success: true,
            message:"Psychiatrist signup successfully in same hospital",
            hdata,
            token
          })
        
    
      }
  }catch(err){
    return res.status(502).json({
        success:false,
        message:"Error in updating hospital details"
    })
  }

});

// patient registration

router.post("/registration", async (req, res) => {
  const { Pemail, name, address, contact, email, password,otp } = req.body;

  

  if(!Pemail || !name || !address || !contact || !email || !password || !otp){
    return res.status(400).json({
      success:false,
      message: "All feilds are required"
    })
  }

  const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
 
  if (recentOtp.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Otp not found",
    });
  } else if (otp !== recentOtp[0].otp) {
    return res.status(400).json({
      success: false,
      messsage: "Invalid OTP",
    });
  }

  try {
    const check_email = await Psychiatrist.findOne({ email: { $regex: new RegExp(Pemail, "i") } });

    if (!check_email) {
      return res.status(400).json({ success: false, message: "Psychiatrist is not registered" });
    }

    const patient_email = await Patient.findOne({ email: email });
    if (patient_email) {
      return res.status(200).json({ success: true, message: "Patient is already registered" });
    }

    const image = req.files.file;

    const imageToCloudinary = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name: name,
      address: address,
      email: email,
      password: hashedPassword,
      photo: imageToCloudinary.secure_url,
    });

    try {
      const patient_details = await Psychiatrist.findOneAndUpdate(
        { email: Pemail },
        { $push: { patients: patient._id } },
        { new: true }
      );

      

      try {
        const psychiatrist_details = await Hospital.findOneAndUpdate(
          { psychiatrists: check_email._id },
          { $push: { patients: patient._id } },
          { new: true }
        );

        return res.json({
          success: true,
          message: "Patient created",
          patient,
          patient_details,
          psychiatrist_details,
        });
      } catch (err) {
        return res.status(502).json({
          success: false,
          message: "Error in updating patient details in the hospital",
        });
      }
    } catch (err) {
      return res.status(502).json({
        success: false,
        message: "Error in updating Psychiatrist details",
      });
    }
  } catch (err) {
    console.error("Error in creating patient", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


//fetch details

router.post("/fetch", async (req, res) => {
  try {
    const { hID } = req.body;

    if(!hID){
      return res.status(404).json({
        success: false,
        message: "All feilds are necessary",
      });
    }


    const details = await Hospital.findById(hID).populate({
      path: "psychiatrists",
      populate: { path: "patients" },
    });

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    return res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    console.error("Error in fetching hospital details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;
