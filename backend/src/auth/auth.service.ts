import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from '../users/interfaces/create-user.dto';
import { TokenService } from './token/token.service';
import { TokenResponse } from './token/token.interface';
import { RequestUser } from '../users/interfaces/request-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async getSelf(currentUser: RequestUser) {
    const { email, id }: any = await this.userService.get(currentUser.userId);

    return {
      userId: id,
      email,
    };
  }

  async validateUser(email: string, pass: string): Promise<UserModel> {
    return this.userService.validate(email, pass);
  }

  async register(userDto: CreateUserDto): Promise<TokenResponse> {
    const user = await this.userService.create(userDto);

    const [{ token, tokenExpiresIn }, { refreshToken, refreshTokenExpiresIn }] =
      await Promise.all([
        this.tokenService.signToken(user.id),
        this.tokenService.signRefreshToken(user.id),
      ]);

    return {
      user,
      token,
      refreshToken,
      tokenExpiresIn,
      refreshTokenExpiresIn,
    };
  }

  async login({ email, password }: CreateUserDto): Promise<{
    token: string;
    refreshToken: string;
  }> {
    const user = await this.userService.validate(email, password);

    const [{ token }, { refreshToken }]: [TokenResponse, TokenResponse] =
      await Promise.all([
        this.tokenService.signToken(user.id),
        this.tokenService.signRefreshToken(user.id),
      ]);

    return {
      token,
      refreshToken,
    };
  }
}
