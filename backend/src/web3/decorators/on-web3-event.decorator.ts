import { SetMetadata } from '@nestjs/common';

export const WEB3_EVENT_METADATA = 'WEB3_EVENT_METADATA';
export const OnWeb3Event = (
  contract: string,
  event: string,
  options?: any,
): MethodDecorator =>
  SetMetadata(WEB3_EVENT_METADATA, { contract, event, options });
