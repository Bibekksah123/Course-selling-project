const express=require("express")

const userRouter=express.Router()

userRouter.post("/singup", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

userRouter.post("/singin", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

module.exports=userRouter