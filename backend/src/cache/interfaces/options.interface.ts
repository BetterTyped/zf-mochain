import { ModuleMetadata } from '@nestjs/common';

export interface CacheAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => CacheOptions;
  inject: any[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CacheOptions {}
