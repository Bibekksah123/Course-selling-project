const jwt=require("jsonwebtoken");

const userMiddlewareChecker=async(req,res,next)=>{
  const token=req.cookies.token;
  const decode = await jwt.verify(token, process.env.JWT_SECRETE_CODE);
  if(!decode){
    return res.status(422).json({
      message:"Please Login"
    })
  }
  req.user=decode.id
  next()
}

module.exports=userMiddlewareChecker