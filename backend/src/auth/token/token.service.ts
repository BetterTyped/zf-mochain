import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConfig } from 'nestjs-config';

import { TokenResponse, RevokeTokenDto } from './token.interface';
import { CacheService } from '../../cache/cache.service';
import { ConfigNamesEnum } from '../../config/ConfigNamesEnum';

@Injectable()
export class TokenService {
  private tokenConfig: any;
  private refreshConfig: any;

  constructor(
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    @InjectConfig() private readonly config,
  ) {
    this.tokenConfig = this.config.get(ConfigNamesEnum.jwt);
    this.refreshConfig = this.config.get(ConfigNamesEnum.jwtRefresh);
  }

  verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  async signToken(userId: number): Promise<TokenResponse> {
    const { expiresIn } = this.tokenConfig.signOptions;
    const payload = {
      userId,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
    });

    return {
      token,
      tokenExpiresIn: expiresIn,
    };
  }

  async signRefreshToken(userId: number): Promise<TokenResponse> {
    const { expiresIn } = this.refreshConfig;
    const payload = {
      userId,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn,
    });

    await this.cacheService.set(
      refreshToken,
      refreshToken,
      this.refreshConfig.expiresIn,
    );
    return {
      refreshToken,
      refreshTokenExpiresIn: expiresIn,
    };
  }

  async getNewToken({ refreshToken }: RevokeTokenDto) {
    const user = await this.verifyRefreshToken(refreshToken);

    if (user) {
      const { token } = await this.signToken(user.userId);
      return { token, refreshToken };
    }

    throw new UnauthorizedException();
  }

  async revokeRefreshToken({ refreshToken }): Promise<any> {
    await this.cacheService.del(refreshToken);
  }

  private async verifyRefreshToken(refreshToken: string): Promise<any> {
    const cachedToken = await this.cacheService.get(refreshToken);

    if (cachedToken === null) {
      return null;
    }

    return this.jwtService.verifyAsync(refreshToken);
  }
}
