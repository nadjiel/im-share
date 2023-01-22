import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
import { AWS_ACCESS_KEY, AWS_ACCESS_SECRET } from "../env.js";

const s3 = new aws.S3({
  region: "us-east-1",
  signatureVersion: "v4",
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_ACCESS_SECRET,
});

export async function generateUploadURL() {
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Expires: 60,
    Key: imageName,
    Bucket: "redesocialdefotos",
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
