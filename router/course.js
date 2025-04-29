const express=require("express");
const userMiddlewareChecker = require("../middleware/user");
const purchaseModel = require("../model/purchase");
const courseModel = require("../model/course");

const courseRouter=express.Router()

courseRouter.post("/purchase/:courseId",userMiddlewareChecker, async function (req, res) {
  const {courseId}=req.params;
  const userId=req.user
  try {
    const checkCourse=await purchaseModel.find({$and:[{courseId:courseId},{userId:userId}]})
    if(!checkCourse){
      return res.send("already have Course purchcase")
    }
    const puchaseCourse=await purchaseModel.create({
      courseId,
      userId
    })
    res.status(201).json({
      message: "course purchase succeeded",
      puchaseCourse
    });
  } catch (error) {
    
  }

});

courseRouter.get("/preview",async function (req, res) {
  const courses=await courseModel.find({})
  res.status(201).json({
    message: "All courseList",
    courses
  });
});

module.exports=courseRouter
