import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    //JWS - Jason Web token

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "This user do not exist" });

    const passwordResponse = await user.comparePassword(password)
    if(!passwordResponse) return res.status(403).json({ error: 'Incorrect credentials'})


    //JWS - Jason Web token
    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};
