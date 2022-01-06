import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WEB3_EVENT_METADATA } from './decorators/on-web3-event.decorator';

@Injectable()
export class Web3MetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getWeb3EventHandlerMetadata(target: Type<unknown>): any {
    return this.reflector.get(WEB3_EVENT_METADATA, target);
  }
}
