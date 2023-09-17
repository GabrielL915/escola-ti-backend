import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { LoginUseCase } from './login.use-case';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async refreshToken(motoboyId: string, refreshToken: string) {
    try {
      const storedTokens = await this.getStoredTokens(motoboyId);

      if (!storedTokens) {
        throw new NotFoundException('Token não encontrado');
      }
      const [email] = await this.getMotoboy(motoboyId);
      const { access_token, refresh_token } =
        await this.loginUseCase.generateToken(motoboyId, email);

      await this.updateAccount(motoboyId, access_token, refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar token.', error);
    }
  }

  private async getMotoboy(id: string) {
    try {
      return await this.knex
        .from('entregador')
        .select('email')
        .where({ id: id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao recuperar motoboy.',
        error,
      );
    }
  }

  private async getStoredTokens(id: string) {
    try {
      return await this.knex
        .from('account')
        .select('refresh_token')
        .where({ id_entregador: id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao recuperar tokens.',
        error,
      );
    }
  }

  private async updateAccount(
    id: string,
    accessToken: string,
    refreshToken: string,
  ) {
    try {
      return await this.knex('account')
        .where({ id_entregador: id })
        .update({ refresh_token: refreshToken, access_token: accessToken });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar conta.', error);
    }
  }
}
