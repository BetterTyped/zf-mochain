import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';

import { RevokeTokenDto, TokenRefreshResponse } from './token/token.interface';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { CreateUserDto } from '../users/interfaces/create-user.dto';
import { RequestUser } from '../users/interfaces/request-user';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getSelf(@CurrentUser() currentUser: RequestUser) {
    return this.authService.getSelf(currentUser);
  }

  @Post('/register')
  async createUser(@Body() userData: CreateUserDto): Promise<any> {
    const { token, refreshToken } = await this.authService.register(userData);
    return {
      token,
      refreshToken,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.login(user);
  }

  @Post('/token')
  async getNewToken(
    @Body() refreshToken: RevokeTokenDto,
  ): Promise<TokenRefreshResponse> {
    return this.tokenService.getNewToken(refreshToken);
  }

  @Post('/token/revoke')
  async revokeToken(
    @Body() revokeTokenDto: { refreshToken: string },
  ): Promise<any> {
    await this.tokenService.revokeRefreshToken(revokeTokenDto);
    return {};
  }
}
