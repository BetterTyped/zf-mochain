import {Inject, Injectable} from '@nestjs/common';
import {CACHE_OPTIONS} from "./consts/cache.consts";
import {CacheOptions} from "./interfaces/options.interface";
import Ioredis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redisClient: Ioredis.Redis;

  constructor(
    @Inject(CACHE_OPTIONS) cacheOptions: CacheOptions,
  ) {
    this.redisClient = new Ioredis(cacheOptions);
  }



}
