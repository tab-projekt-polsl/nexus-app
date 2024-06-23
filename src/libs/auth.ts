export function getJwtSecretKey() {
  const secret = "AnythingIsASecretKey";

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}
