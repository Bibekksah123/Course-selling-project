const mongoose=require("mongoose");

const connectionToDB=async()=>{
  await mongoose.connect("")
}

module.exports = connectionToDB
