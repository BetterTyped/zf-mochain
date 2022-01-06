import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from './interfaces/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(UserModel) private userModel: typeof UserModel) {}

  async create({ email, password }: CreateUserDto): Promise<UserModel> {
    return this.userModel.query().insert({ email, password });
  }

  async get(userId: number): Promise<UserModel> {
    return this.userModel.query().findById(userId).select('user.id', 'email');
  }

  async update(userId: number, email: string): Promise<UserModel> {
    return this.userModel.query().patchAndFetchById(userId, { email });
  }

  async delete(userId: number): Promise<any> {
    return this.userModel.query().deleteById(userId);
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const user = await this.userModel
      .query()
      .findOne({ email })
      .select('user.id', 'user.password');
    if (!user) {
      throw new NotFoundException();
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
