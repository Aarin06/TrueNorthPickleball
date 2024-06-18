import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized.");
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  });
};
