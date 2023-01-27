import { CLOUDINARY_SECRET } from "../env";

export function validateUpload({ signature, publicId, version }) {
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    CLOUDINARY_SECRET
  );

  return expectedSignature !== signature;
}
