import { v7 as uuidv7 } from "uuid";

export function generateUUIDv7() {
  return uuidv7();
}

export async function generateNanoID(length: number = 21) {
  const { nanoid } = await import("nanoid");
  return nanoid(length);
}
