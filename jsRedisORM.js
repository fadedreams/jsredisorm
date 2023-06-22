import { createClient } from "redis";

export default class jsRedisORM {
  constructor(
    host,
    port,
    username = null,
    password = null,
    tlsOptions = null,
    dbIndex = 0,
    keyPrefix = ""
  ) {
    this.client = createClient({
      host: host,
      port: port,
      username: username,
      password: password,
      tls: tlsOptions,
      db: dbIndex,
    });
    this.keyPrefix = keyPrefix;
  }

  async connect() {
    await this.client.connect();
  }

  getKeyWithPrefix(key) {
    return this.keyPrefix + key;
  }

  async set(key, value, expiration = null) {
    await this.client.del(this.getKeyWithPrefix(key)); // Clear existing list
    await this.client.set(this.getKeyWithPrefix(key), value);
    if (expiration !== null) {
      await this.client.expire(this.getKeyWithPrefix(key), expiration);
    }
  }

  async get(key) {
    return await this.client.get(this.getKeyWithPrefix(key));
  }

  async delete(key) {
    await this.client.delete(key);
  }

  async getList(key) {
    const values = await this.client.lRange(this.getKeyWithPrefix(key), 0, -1);
    return values;
  }

  async setList(key, values, expiration = null) {
    await this.client.del(this.getKeyWithPrefix(key)); // Clear existing list
    await Promise.all(
      values.map((value) =>
        this.client.rPush(this.getKeyWithPrefix(key), value)
      )
    );

    if (expiration) {
      await this.client.expire(this.getKeyWithPrefix(key), expiration);
    }
  }

  async deleteList(key) {
    await this.client.delete(this.getKeyWithPrefix(key));
  }

  async getSet(key) {
    const values = await this.client.sMembers(this.getKeyWithPrefix(key));
    return values;
  }

  async setSet(key, values, expiration = null) {
    await this.client.delete(this.getKeyWithPrefix(key)); // Clear existing set

    const promises = values.map((value) =>
      this.client.sAdd(this.getKeyWithPrefix(key), value)
    );
    await Promise.all(promises);

    if (expiration !== null) {
      await this.client.expire(this.getKeyWithPrefix(key), expiration);
    }
  }

  async getHash(key) {
    const values = await this.client.hGetAll(this.getKeyWithPrefix(key));
    return values;
  }

  async setHash(key, values, expiration = null) {
    await this.deleteHash(key); // Clear existing set
    const entries = Object.entries(values);
    const args = entries.flatMap(([field, value]) => [field, value]);

    await this.client.hSet(this.getKeyWithPrefix(key), args);

    if (expiration !== null) {
      await this.client.expire(this.getKeyWithPrefix(key), expiration);
    }
  }

  async deleteHash(key) {
    await this.client.del(this.getKeyWithPrefix(key));
  }

  async hllAdd(key, ...values) {
    return await this.client.pfAdd(this.getKeyWithPrefix(key), ...values);
  }

  async hllCount(key) {
    return await this.client.pfCount(this.getKeyWithPrefix(key));
  }

  async hllMerge(destKey, ...sourceKeys) {
    return await this.client.pfMerge(
      this.getKeyWithPrefix(destKey),
      ...sourceKeys.map((sourceKey) => this.getKeyWithPrefix(sourceKey))
    );
  }

  async setBit(key, offset, value) {
    this.deleteBit(this.getKeyWithPrefix(key));
    return await this.client.setBit(this.getKeyWithPrefix(key), offset, value);
  }

  async getBit(key, offset) {
    return await this.client.getBit(this.getKeyWithPrefix(key), offset);
  }

  async deleteBit(key) {
    await this.client.del(this.getKeyWithPrefix(key));
  }

  async quit() {
    return new Promise((resolve, reject) => {
      this.client.quit((err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}
