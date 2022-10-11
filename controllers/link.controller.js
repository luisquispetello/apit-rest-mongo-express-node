import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });

    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) return res.status(404).json({ error: "Link do not exist" });

    if (!link.uid.equals(req.uid))
      res.status(404).json({ error: "Not access 🤡" });

    return res.json({ link });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res.status(404).json({ error: "Invalid Id format" });
    return res.status(500).json({ error: "server error" });
  }
};

export const createLink = async (req, res) => {
  try {
    let { longLink } = red.body;
    if (!longLink.startWith("https://")) longLink = "https://" + longLink;

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    console.log(link);
    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) return res.status(404).json({ error: "Link does not exist" });

    if (!link.uid.equals(req.uid))
      res.status(404).json({ error: "Not access 🤡" });

    await link.remove();
    return res.json({ link });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res.status(404).json({ error: "Invalid Id format" });
    return res.status(500).json({ error: "server error" });
  }
};
