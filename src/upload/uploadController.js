import { v2 } from "cloudinary";
import { Router } from "express";
import { clConfig } from "./clConfig";

const router = Router();
export const uploadController = router;

router.get("/signature", (req, res) => {
  const { timestamp, signature } = getSignature();
  res.json({ timestamp, signature });
});

app.post("/do-something-with-photo", async (req, res) => {
  const { publicId, version } = req.body;

  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    clConfig.api_secret
  );

  if (expectedSignature !== req.body.signature) {
    res.status(403).json({ error: "The signature is invalid" });
  }

  // todo save using publicId
});
