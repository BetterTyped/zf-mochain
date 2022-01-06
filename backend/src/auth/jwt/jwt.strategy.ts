import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { ConfigNamesEnum } from '../../config/ConfigNamesEnum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectConfig() private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(ConfigNamesEnum.jwt).secret,
    });
  }

  async validate({ userId }: any) {
    return { userId };
  }
}
