import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ProfileDto } from '../dto/profile.dto';

export class ProfileUseCase {
  private readonly logger = new Logger(ProfileUseCase.name);

  constructor(@InjectModel() private readonly knex: Knex) {}

  async profile(email: string): Promise<ProfileDto[]> {
    try {
      const fullProfile = await this.knex
        .from('entregador')
        .select('nome', 'aiqcoins')
        .where({ email: email });

      if (!fullProfile || fullProfile.length === 0) {
        this.logger.warn(`Perfil não encontrado para o email: ${email}`);
      } else {
        this.logger.log(`Perfil recuperado para o email: ${email}`);
      }

      return fullProfile;
    } catch (error) {
      this.logger.error(
        `Erro ao recuperar perfil para o email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Erro ao recuperar perfil.',
        error,
      );
    }
  }
}
