const mongoose=require("mongoose");

const courseSchema=mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin',
    required: true,
  },
}, { timestamps: true });


const courseModel=mongoose.model("Course",courseSchema);
module.exports=courseModel