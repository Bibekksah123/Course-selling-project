const express=require("express");
require("dotenv").config()
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
const adminRouter = require("./router/admin");
const connectionToDB = require("./config/db");

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter)

connectionToDB().then(()=>{
  console.log("connecte to db successfully")
  app.listen(7001,()=>{
    console.log(`http://localhost:7001/`);
  })
}).catch((error)=>{
  console.log(error)
})
