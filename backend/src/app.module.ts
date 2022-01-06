import { Module } from '@nestjs/common';
import { Web3Module } from './web3/web3.module';
import {ConfigModule, ConfigService} from "nestjs-config";
import { resolve } from 'path';
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: name => name.replace('.config', ''),
      },
    ),
    Web3Module.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('web3'),
      inject: [ConfigService],
    }),
    Web3Module.forFeatureAsync({
      name: 'contract',
      useFactory: async (configService: ConfigService) => configService.get('web3'),
      inject: [ConfigService],
    }),
    CacheModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
