const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const commonHelper = require("../helper/common")

const protect =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
        req.payload = decoded
        next()
    }else{
        res.status(401).json({
            message : "server need token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token invalid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token expired'))
    }else{
      next(new createError(400,'Token not active'))
    }
  }
}
const isAdmin = (req, res, next) => {
  const payload = req.payload;
  if (payload) {
    if (payload.role === "admin") {
      next();
    } else {
      commonHelper.response(res, null, 403,
        "Unauthorized, please login as admin");
    }
  } else {
    commonHelper.response(res, null, 403, "User not found");
  }
};

module.exports = {protect, isAdmin}