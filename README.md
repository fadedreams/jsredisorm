# jsRedisORM

jsRedisORM is a Node.js library that provides an Object-Relational Mapping (ORM) interface for interacting with Redis 4.6.7. It simplifies the process of working with Redis as a cache or a data store in your Node.js applications.

## Installation

You can install jsRedisORM using npm:

```bash
npm install jsredisorm
```

### Usage

To use jsRedisORM in your project, import the createClient function from the Redis library and the jsRedisORM class from the jredis-orm package:

```javascript
import { createClient } from "redis";
import jsRedisORM from "jredis-orm";
```

Create an instance of the jsRedisORM class by providing the required Redis connection details:

```javascript
const redis = new jsRedisORM(
  host,
  port,
  (username = null),
  (password = null),
  (tlsOptions = null),
  (dbIndex = 0),
  (keyPrefix = "")
);
```

### Connecting to Redis

Before interacting with Redis, you need to establish a connection. Use the connect method to connect to the Redis server:

```javascript
await redis.connect();
```

###Caching Data
NodeRedisORM provides methods to set, get, and delete key-value pairs, lists, sets, hashes, and more. Here are some examples:

```javascript
// Set a value in Redis
await redis.set("key", "value");

// Get a value from Redis
const value = await redis.get("key");

// Delete a key from Redis
await redis.delete("key");
```

### Disconnecting from Redis

To disconnect from the Redis server, you can use the quit method:

```javascript
await redis.quit();
```

### API Documantation

The following methods are available in the jsRedisORM class:

    connect(): Connects to the Redis server.
    set(key, value, expiration): Sets a value for the specified key in Redis.
    get(key): Retrieves the value for the specified key from Redis.
    delete(key): Deletes the specified key from Redis.
    setList(key, values, expiration): Sets a list of values for the specified key in Redis.
    getList(key): Retrieves the list of values for the specified key from Redis.
    deleteList(key): Deletes the list associated with the specified key from Redis.
    setSet(key, values, expiration): Sets a set of values for the specified key in Redis.
    getSet(key): Retrieves the set of values for the specified key from Redis.
    deleteSet(key): Deletes the set associated with the specified key from Redis.
    setHash(key, values, expiration): Sets a hash of key-value pairs for the specified key in Redis.
    getHash(key): Retrieves the hash of key-value pairs for the specified key from Redis.
    deleteHash(key): Deletes the hash associated with the specified key from Redis.

### Contributing

Contributions to jsRedisORM are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.
