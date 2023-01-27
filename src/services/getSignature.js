import { clConfig } from "./clConfig";
import { v2 } from "cloudinary";

export function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = v2.utils.api_sign_request(
    { timestamp: timestamp },
    clConfig.api_secret
  );
  return { timestamp, signature };
}
