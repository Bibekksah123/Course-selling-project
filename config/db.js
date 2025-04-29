const mongoose=require("mongoose");

const connectionToDB=async()=>{
  await mongoose.connect(process.env.MONGODATABASE_CONTACTION);
}

module.exports = connectionToDB