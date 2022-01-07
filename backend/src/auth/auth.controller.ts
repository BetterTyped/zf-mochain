import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Get, HttpStatus,
} from '@nestjs/common';

import { RevokeTokenDto, TokenRefreshResponse } from './token/token.interface';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { CreateUserDto } from '../users/interfaces/create-user.dto';
import { RequestUser } from '../users/interfaces/request-user';
import { CurrentUser } from '../decorators/current-user.decorator';
import {ApiTags} from "@nestjs/swagger";
import {ApiGetResponse, ApiPostResponse} from "@epcnetwork/nestjs-swagger";
import {User} from "../users/interfaces/user.interface";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiGetResponse({
    type: User,
    isAuthGuard: true,
    summary: 'Returns user',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getSelf(@CurrentUser() currentUser: RequestUser) {
    return this.authService.getSelf(currentUser);
  }

  @ApiPostResponse({
    requestType: CreateUserDto,
    responseType: User,
    summary: 'Register user',
  })
  @Post('/register')
  async createUser(@Body() userData: CreateUserDto): Promise<any> {
    const { token, refreshToken } = await this.authService.register(userData);
    return {
      token,
      refreshToken,
    };
  }

  @ApiPostResponse({
    requestType: CreateUserDto,
    responseType: User,
    summary: 'Authenticate user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.login(user);
  }

  @ApiPostResponse({
    requestType:  RevokeTokenDto,
    responseType: TokenRefreshResponse,
    summary: 'Reset user password',
  })
  @Post('/token')
  async getNewToken(
    @Body() refreshToken: RevokeTokenDto,
  ): Promise<TokenRefreshResponse> {
    return this.tokenService.getNewToken(refreshToken);
  }

  @ApiPostResponse({
    requestType:  RevokeTokenDto,
    responseType: null,
    summary: 'Reset user password',
    httpCode: HttpStatus.NO_CONTENT
  })
  @Post('/token/revoke')
  async revokeToken(
    @Body() revokeTokenDto: { refreshToken: string },
  ): Promise<any> {
    await this.tokenService.revokeRefreshToken(revokeTokenDto);
    return {};
  }
}
