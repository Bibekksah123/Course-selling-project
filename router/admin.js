const express=require("express")

const adminRouter=express.Router()

adminRouter.post("/singup", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

adminRouter.post("/singin", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

adminRouter.get("/courses/bulk", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

adminRouter.post("/courses", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

adminRouter.put("/courses", function (req, res) {
  res.status(2001).json({
    message: "singup endpoint",
  });
});

module.exports=adminRouter