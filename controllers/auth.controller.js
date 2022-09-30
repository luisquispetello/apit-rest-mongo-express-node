import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import {
  generateRefreshToken,
  generateToken,
  tokenVerificationErrors,
} from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    //JWS - Jason Web token

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error registering" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "This user do not exist" });

    const passwordResponse = await user.comparePassword(password);
    if (!passwordResponse)
      return res.status(403).json({ error: "Incorrect credentials" });

    //JWS - Jason Web token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ok: true})
}