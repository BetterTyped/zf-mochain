import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Web3AsyncOptions } from './interfaces/options.interface';
import { WEB3_OPTIONS } from './consts/web3.consts';
import Web3 from 'web3';
import { Web3MetadataAccessor } from './web3-metadata.accessor';
import { Web3SubscribersLoader } from './web3-subscribers.loader';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({})
export class Web3Module {
  static forRootAsync(options: Web3AsyncOptions): DynamicModule {
    const web3Provider = {
      provide: 'WEB3',
      useFactory: async (web3Options) => {
        return new Web3(web3Options.provider);
      },
      inject: [WEB3_OPTIONS],
    };
    return {
      module: Web3Module,
      providers: [this.createOptionsProvider(options), web3Provider],
      exports: [web3Provider],
    };
  }

  static forFeatureAsync(options): DynamicModule {
    const provider: Provider = {
      provide: options.name,
      useFactory: async (web3Constructor, ...args) => {
        const { contract, contractAddress } = await options.useFactory(...args);
        const { abi } = await import(contract);
        return new web3Constructor.eth.Contract(abi, contractAddress);
      },
      inject: ['WEB3', ...(options.inject || [])],
    };
    return {
      module: Web3Module,
      imports: [DiscoveryModule],
      providers: [provider, Web3MetadataAccessor, Web3SubscribersLoader],
      exports: [provider],
    };
  }

  private static createOptionsProvider(options: Web3AsyncOptions): Provider {
    return {
      provide: WEB3_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
