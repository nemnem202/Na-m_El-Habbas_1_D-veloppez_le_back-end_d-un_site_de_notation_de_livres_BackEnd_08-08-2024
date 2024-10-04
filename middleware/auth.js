const WebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = WebToken.verify(token, secret);
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
