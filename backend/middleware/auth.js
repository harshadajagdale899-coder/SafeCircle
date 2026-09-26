const jwt = require("jsonwebtoken");

exports.protectedRoutes = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req._id = jwt.verify(token, process.env.JWT_SECRET).userId;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Fail",
      message: err.message,
    });
  }
};
