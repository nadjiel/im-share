import { db } from "../database/db.js";
import { GOOGLE_CLIENT_ID } from "../env.js";
import { OAuth2Client } from "google-auth-library";
import { createUser } from "../user/createUser.js";

const client = new OAuth2Client({ clientId: GOOGLE_CLIENT_ID });

export async function signIn(idToken) {
  const ticket = await client.verifyIdToken({ idToken });
  const payload = ticket.getPayload();
  const { name, email, picture, given_name } = payload;
  let user = await db.user.findUnique({ where: { email } });
  if (user) {
    return user;
  }

  const userCount = await db.user.count();
  const username = given_name.toLowerCase() + userCount;
  user = await createUser({ email, name, picture, username });
}
