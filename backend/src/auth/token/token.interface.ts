import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/interfaces/user.interface";

export class TokenResponse {
  @ApiProperty({
    type: User,
  })
  user?: User;

  @ApiProperty({
    type: String,
  })
  token?: string;

  @ApiProperty({
    type: String,
  })
  refreshToken?: string;

  @ApiProperty({
    type: Number,
  })
  tokenExpiresIn?: number;

  @ApiProperty({
    type: Number,
  })
  refreshTokenExpiresIn?: number;
}

export class TokenRefreshResponse {
  @ApiProperty({
    type: String,
  })
  token?: string;
  @ApiProperty({
    type: String,
  })
  refreshToken?: string;
}

export class RevokeTokenDto {

  @ApiProperty({
    type: String,
  })
  @IsString()
  refreshToken: string;
}
