import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from '../models/user.model';

@Global()
@Module({
  imports: [
    ObjectionModule.forFeature([UserModel]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
