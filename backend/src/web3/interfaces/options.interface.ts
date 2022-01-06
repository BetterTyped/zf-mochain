import {ModuleMetadata} from "@nestjs/common";
import AbiItem from 'web3-utils';

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