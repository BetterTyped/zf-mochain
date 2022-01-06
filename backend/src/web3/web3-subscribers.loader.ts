import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, ModuleRef } from '@nestjs/core';
import { Web3MetadataAccessor } from './web3-metadata.accessor';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class Web3SubscribersLoader
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: Web3MetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
    private readonly moduleRef: ModuleRef,
  ) {}

  onApplicationBootstrap(): any {
    this.loadEventListeners();
  }

  onApplicationShutdown(signal?: string): any {}

  loadEventListeners() {
    const providers = this.discoveryService.getProviders();
    const controllers = this.discoveryService.getControllers();

    [...providers, ...controllers]
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance)
      .forEach((wrapper: InstanceWrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);

        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (methodKey: string) =>
            this.subscribeToEventIfListener(instance, methodKey),
        );
      });
  }

  private async subscribeToEventIfListener(
    instance: Record<string, any>,
    methodKey: string,
  ) {
    const eventListenerMetadata =
      this.metadataAccessor.getWeb3EventHandlerMetadata(instance[methodKey]);

    if (!eventListenerMetadata) {
      return;
    }

    const { contract, event, options = {} } = eventListenerMetadata;
    const localContract = await this.moduleRef.resolve(contract);
    localContract.events[event](options, instance[methodKey]);
  }
}
