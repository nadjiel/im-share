import "./configUpload.js";
import { Router } from "express";
import { getSignature } from "./getSignature.js";

const router = Router();
export const uploadController = router;

router.get("/signature", (req, res) => {
  const { timestamp, signature } = getSignature();
  res.json({ timestamp, signature });
});
