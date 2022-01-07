import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    format: 'email',
  })
  readonly email: string;
  @ApiProperty({
    type: String,
    description: 'User password',
  })
  readonly password: string;
}
