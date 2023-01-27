import { clConfig } from "./clConfig";

export function validateUpload({ signature, publicId, version }) {
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    clConfig.api_secret
  );

  return expectedSignature !== signature;
}
