import { v2 } from "cloudinary";
import { Router } from "express";
import { clConfig } from "./clConfig.js";

const router = Router();
export const uploadController = router;

router.get("/signature", (req, res) => {
  const { timestamp, signature } = getSignature();
  res.json({ timestamp, signature });
});
