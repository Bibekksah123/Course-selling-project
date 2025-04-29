const express=require("express");
const validator = require("../utils/validation");
const userModel=require("../model/user");
const jwt=require("jsonwebtoken");
const userMiddlewareChecker = require("../middleware/user");
const purchaseModel = require("../model/purchase");

const userRouter=express.Router()

userRouter.post("/singup", async function (req, res) {
  try {
    const validateUserData=await validator.parse(req.body);
    const user=await new userModel(validateUserData);
    await user.save()
    res.status(201).json({
      message: "singup succeeded",
      user
    });
    
  } catch (error) {
    if(error.errors){
      console.log("zod validation error");
    }else{
      console.log(error)
    }
  }
});

userRouter.post("/singin", async function (req, res) {
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({
      email:email,password:password
    })
    if(!user){
      res.status(401).json({
        message:"invalide credentials"
      })
    }
    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRETE_CODE,{
        expiresIn:"1d"
      }
    );
    res.cookie("token",token,{maxAge: 3600000*24,httpOnly:true}).status(201).json({
      message: "singin succeeded",
      user
    });
  } catch (error) {
    console.log(error)
  }
});

userRouter.get("/purchases",userMiddlewareChecker,async function (req, res) {
  const coursePurchaseList=await purchaseModel.find({userId:req?.user})
  res.status(201).json({
    message: "Your course purchase list",
    coursePurchaseList
  });
});

module.exports=userRouter