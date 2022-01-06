import { Inject, Injectable } from '@nestjs/common';
import { CACHE_OPTIONS } from './consts/cache.consts';
import { CacheOptions } from './interfaces/options.interface';
import Ioredis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redisClient: Ioredis.Redis;

  constructor(@Inject(CACHE_OPTIONS) cacheOptions: CacheOptions) {
    this.redisClient = new Ioredis(cacheOptions);
  }

  async get<T>(value: string): Promise<T | string | null> {
    const result = await this.redisClient.get(value);

    if (result === null) {
      return null;
    }

    return JSON.parse(result) as T;
  }

  async set<T>(key: string, value: T, config = 3600) {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', config);
  }

  async del(key: string) {
    if (key) await this.redisClient.del(key);
  }
}
