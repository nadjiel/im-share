import { v2 } from "cloudinary";
import { CLOUDINARY_SECRET } from "../env.js";

export function validateSignature({ publicId, version, signature }) {
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    CLOUDINARY_SECRET
  );

  if (expectedSignature !== signature) {
    throw Error("Invalid image signature");
  }
}
