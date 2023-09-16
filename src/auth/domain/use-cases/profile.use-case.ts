import { instanceToPlain } from 'class-transformer';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

export class ProfileUseCase {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async profile(email: string) {
    try {
      const fullProfile = await this.knex
        .from('entregador')
        .where({ email: email });
      return fullProfile;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
