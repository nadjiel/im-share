import { v2 } from "cloudinary";
import { clConfig } from "./clConfig";

app.get("/get-signature", (req, res) => {
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
