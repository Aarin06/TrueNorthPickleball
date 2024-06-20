import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send("Unauthorized.");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized.");
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  });
};
