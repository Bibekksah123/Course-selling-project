const mongoose=require("mongoose");

const connectionToDB=async()=>{
  await mongoose.connect("mongodb://127.0.0.1:27017/courses")
}

module.exports = connectionToDB