import { IsString } from 'class-validator';

export interface TokenResponse {
  user?: any;
  token?: string;
  refreshToken?: string;
  tokenExpiresIn?: number;
  refreshTokenExpiresIn?: number;
}

export interface TokenRefreshResponse {
  token?: string;
  refreshToken?: string;
}

export class RevokeTokenDto {
  @IsString()
  refreshToken: string;
}
