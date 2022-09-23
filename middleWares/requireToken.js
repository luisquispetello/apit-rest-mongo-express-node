export const requireToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    console.log(token);
    if (!token) throw new Error("The token doesn't exist in the header,use Bearer");

    token = token.split(" ")[1];
    const payload = jwt.verify(token, process.process.env.JWT_SECRET);
    console.log(payload);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
