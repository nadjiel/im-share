import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../env.js";

const client = new OAuth2Client({ clientId: GOOGLE_CLIENT_ID });

export async function signIn(idToken) {
  const ticket = await client.verifyIdToken({ idToken });
  const payload = ticket.getPayload();
  console.log(payload);
}
