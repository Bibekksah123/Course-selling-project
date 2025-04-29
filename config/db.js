const mongoose=require("mongoose");

const connectionToDB=async()=>{
<<<<<<< HEAD
  await mongoose.connect(process.env.MONGODATABASE_CONTACTION);
=======
  await mongoose.connect("")
>>>>>>> e11735ec3ab1e116d1b5902a0494d60f62ed2588
}

module.exports = connectionToDB
