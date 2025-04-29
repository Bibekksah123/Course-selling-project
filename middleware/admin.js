const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  const decode = await jwt.verify(token, process.env.ADMIN_JWT_SECRETE_CODE);
  if (!decode) {
    return res.status(422).json({
      message: "Please Login",
    });
  }
  req.admin = decode.id;
  next();
};

module.exports = adminMiddleware;
