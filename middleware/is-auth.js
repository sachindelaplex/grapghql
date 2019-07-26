const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  try {
    jwt.verify(token, "123456789");
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if(!decodedToken){
      req.isAuth=false;
      return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
