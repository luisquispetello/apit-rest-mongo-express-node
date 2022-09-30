import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No Bearer");

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.process.env.JWT_SECRET);

    req.uid = uid;

    // If is verified let it pass

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
