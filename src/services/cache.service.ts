import { redis } from "@/lib/redis";

export async function getCache<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);

  if (!value) return null;

  return JSON.parse(value);
}

export async function setCache(
  key: string,
  value: unknown,
  ttl: number
) {
  await redis.set(
    key,
    JSON.stringify(value),
    "EX",
    ttl
  );
}

export async function deleteCache(key: string) {
  await redis.del(key);
}