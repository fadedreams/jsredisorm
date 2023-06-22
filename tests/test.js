// all test cases is not writen ...
import jsRedisORM from "../jsRedisORM.js";

jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    set: jest.fn().mockImplementation((key, value) => {
      // Implement the Redis `set` behavior here
      // For example, you can store the key-value pair in a data structure
      // or perform any necessary validations or actions

      // Simulate the asynchronous behavior of Redis by using setTimeout
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("OK"); // Resolve the Promise with "OK" to simulate a successful set operation
        }, 100);
      });
    }),
    get: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Rest of the code remains the same

describe("RedisORM", () => {
  let redisORM;

  beforeEach(() => {
    redisORM = new jsRedisORM("localhost", 6379);
  });

  describe("set", () => {
    test("should set a value in Redis", async () => {
      await redisORM.set("key", "value");
      // Add any assertions to check if the value was set successfully
    });

    // Add more test cases for different scenarios
  });

  describe("get", () => {
    test("should get a value from Redis", async () => {
      await redisORM.set("key", "value");
      const result = await redisORM.get("key");
      // Add assertions to check if the retrieved value matches the expected value
    });

    // Add more test cases for different scenarios
  });

  describe("delete", () => {
    test("should delete a key from Redis", async () => {
      await redisORM.set("key", "value");
      await redisORM.delete("key");
      // Add assertions to check if the key was successfully deleted
    });

    // Add more test cases for different scenarios
  });
});
