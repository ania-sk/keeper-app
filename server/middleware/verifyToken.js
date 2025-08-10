import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accesToken = authHeader && authHeader.split(" ")[1];

  if (!accesToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accesToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

export default verifyToken;
