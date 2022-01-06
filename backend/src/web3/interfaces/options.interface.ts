import { ModuleMetadata } from '@nestjs/common';

export interface Web3AsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<Web3Options> | Web3Options;
  inject?: any[];
}

export interface Web3Options {
  provider: string;
  contract: string;
  contractAddress: string;
  callerAddress: string;
}
