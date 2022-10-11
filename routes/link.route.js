import { Router } from "express";
import { getLink ,getLinks, createLink, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middleWares/requireToken.js";
import { bodyLinkValidator } from "../middleWares/validatorManager.js";
const router = Router()

router.get('/', requireToken, getLinks)
router.get('/:id', requireToken, getLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.delete('/:id', requireToken, removeLink)

export default router