import {ModuleMetadata} from "@nestjs/common";


export interface CacheAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => CacheOptions,
  inject: any[];
}

export interface CacheOptions {

}