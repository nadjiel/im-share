import validateUuid from "uuid-validate";

export function verifyUUID(id) {
  if (id && validateUuid(id)) return true;
  else throw new Error("O id enviado não é um UUID");
}
