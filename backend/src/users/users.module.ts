import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from '../models/user.model';
import { ConfigService } from 'nestjs-config';
import { knexSnakeCaseMappers } from 'objection';

@Global()
@Module({
  imports: [
    ObjectionModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        config: {
          ...config.get('sql'),
          ...knexSnakeCaseMappers(),
        },
      }),
      inject: [ConfigService],
    }),
    ObjectionModule.forFeature([UserModel]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
