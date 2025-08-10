import { createClient } from "redis";

// Export the Redis client's type for easy dependency injection.
export type RedisClientType = ReturnType<typeof createClient>;

/**
 * Creates and configures a Redis client instance.
 *
 * @param url - The connection URL for the Redis server.
 * @returns A Redis client instance with an attached error listener.
 */
export const createRedisClient = (url: string): RedisClientType => {
  const redisClient = createClient({ url });

  // ⚠️ CRITICAL: Attach an error listener to prevent crashes.
  redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  return redisClient;
};
