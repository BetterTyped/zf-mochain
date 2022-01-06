import { Model, ModelOptions, QueryContext } from 'objection';
import { compare, hash } from 'bcrypt';

const BCRYPT_HASH_REGEX = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;

export class UserModel extends Model {
  static tableName = 'user';

  id!: number;
  email!: string;
  password!: string;

  async $beforeInsert(context: QueryContext): Promise<void> {
    await super.$beforeInsert(context);
    await this.generateHash();
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, context);
    await this.generateHash();
  }

  comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  async generateHash(): Promise<void> {
    if (typeof this.password === 'undefined') {
      return;
    }

    if (BCRYPT_HASH_REGEX.test(this.password)) {
      throw new Error('bcrypt tried to hash another bcrypt hash');
    }

    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
}
