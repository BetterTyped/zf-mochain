import { Module } from '@nestjs/common';
import { Web3Module } from './web3/web3.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from './cache/cache.module';
import {ConfigNamesEnum} from "./config/ConfigNamesEnum";
import {WinstonModule} from "nest-winston";
import { CarDataModule } from './car-data/car-data.module';
import {ObjectionModule} from "@willsoto/nestjs-objection";
import {knexSnakeCaseMappers} from "objection";


@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
      },
    ),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNamesEnum.logger),
      inject: [ConfigService],
    }),
    Web3Module.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get(ConfigNamesEnum.web3),
      inject: [ConfigService],
    }),
    Web3Module.forFeatureAsync({
      name: 'contract',
      useFactory: async (configService: ConfigService) =>
        configService.get(ConfigNamesEnum.web3),
      inject: [ConfigService],
    }),
    CacheModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get(ConfigNamesEnum.redis),
      inject: [ConfigService],
    }),
    ObjectionModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        config: {
          ...config.get('sql'),
          ...knexSnakeCaseMappers(),
        },
      }),
      inject: [ConfigService],
    }),
    DbModule,
    AuthModule,
    UsersModule,
    CarDataModule,
  ],
})
export class AppModule {}
