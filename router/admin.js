const express=require("express");
const validator = require("../utils/validation");
const adminModel = require("../model/admin");
const jwt=require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const courseModel = require("../model/course");
const courseVlidator = require("../utils/course-validator");


const adminRouter=express.Router()

adminRouter.post("/singup", async function (req, res) {
  try {
    const validateUserData=await validator.parse(req.body);
    const admin=await new adminModel(validateUserData);
    await admin.save()
    res.status(201).json({
      message: "singup succeeded",
      admin
    });
    
  } catch (error) {
    if(error.errors){
      console.log("zod validation error");
    }else{
      console.log(error)
    }
  }
});

adminRouter.post("/singin",async function (req, res) {
  const {email,password}=req.body;
  try {
    const admin=await adminModel.findOne({
      email:email,password:password
    })
    if(!admin){
      res.status(401).json({
        message:"invalide credentials"
      })
    }
    const token = await jwt.sign(
      {
        id: admin._id,
      },
      process.env.ADMIN_JWT_SECRETE_CODE,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token",token,{maxAge: 3600000*24,httpOnly:true}).status(201).json({
      message: "singin succeeded",
      admin
    });
  } catch (error) {
    console.log(error)
  }
});

adminRouter.get("/courses/bulk", adminMiddleware,async function (req, res) {
  try {
    const adminId=req?.admin
    const getAllCoursesList=await courseModel.find({creator:adminId});
    if(getAllCoursesList?.length==null || getAllCoursesList?.length<0){
      res.send("No Courses Listed Yet")
    }
    res.status(201).json({
      message: "Course get succeded",
      getAllCoursesList
    });
  } catch (error) {
    
  }
});

adminRouter.post("/courses",adminMiddleware,async function (req, res) {
  const {title,description,price,imageUrl}=req.body
  try {
    const vaidationData = await courseVlidator.parseAsync({
      title,
      description,
      price,
      imageUrl,
    });
    if(!vaidationData){
      return res.send("invalid data")
    }

    const admin=await new courseModel(
      {
        title,
        description,
        price,
        imageUrl,
        creator:req.admin
      }
    )
   await admin.save()
    res.status(201).json({
      message: "Course created succeded",
      admin
    });
  } catch (error) {
    if(error.errors){
      console.log("zod invalid data",error.errors)
    }else{
      console.log(error)
    }
  }
  
});

adminRouter.put("/courses/:id",adminMiddleware, async function (req, res) {
  try {
    const {id}=req?.params;
    const adminId=req?.admin
   const checkData=await courseVlidator.parse(req.body);
     if (!checkData) {
       return res.send("invalid data");
     }
     
   const courseFindandUpdate = await courseModel.findByIdAndUpdate(
     { _id: id, creator: adminId },
     checkData
   );
   if(!courseFindandUpdate){
    res.send("Cannot update. SomeThing Error")
   }
   await courseFindandUpdate.save()
    res.status(201).json({
      message: "course update succeded",
      courseFindandUpdate
    });
    
  } catch (error) {
    console.log(error)
  }
});

module.exports=adminRouter