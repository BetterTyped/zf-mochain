import {DynamicModule, Module, Provider} from '@nestjs/common';
import { CacheService } from './cache.service';
import {CACHE_OPTIONS} from "./consts/cache.consts";
import {CacheAsyncOptions} from "./interfaces/options.interface";

@Module({})
export class CacheModule {

  static forRootAsync(options: CacheAsyncOptions): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        this.createOptionsProvider(options),
        CacheService,
      ],
      exports: [
        CacheService
      ]
    }
  }

  private static createOptionsProvider(options: CacheAsyncOptions): Provider {
    return {
      provide: CACHE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }
  }

}
