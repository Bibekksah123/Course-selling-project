const express=require("express")

const courseRouter=express.Router()

courseRouter.post("/purchase", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

module.exports=courseRouter
