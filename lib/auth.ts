import crypto from "crypto";

export type SessionUser = {
  userId: number;
  name: string;
  email: string;
  memberSince: string;
};

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedPasswordHash: string) {
  const [salt, storedHash] = storedPasswordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const derivedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  const storedBuffer = Buffer.from(storedHash, "hex");
  const derivedBuffer = Buffer.from(derivedHash, "hex");

  if (storedBuffer.length !== derivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedBuffer, derivedBuffer);
}

export function buildSessionUser(user: {
  user_id: number;
  name: string;
  email: string;
  createdAt?: Date | null;
}) {
  return {
    userId: user.user_id,
    name: user.name,
    email: user.email,
    memberSince: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(),
  } satisfies SessionUser;
}
