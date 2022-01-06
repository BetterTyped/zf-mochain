import { Global, Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { ConfigService } from 'nestjs-config';
import { ConfigNamesEnum } from '../config/ConfigNamesEnum';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './token/token.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    CacheModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNamesEnum.redis),
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService, JwtStrategy, LocalStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
