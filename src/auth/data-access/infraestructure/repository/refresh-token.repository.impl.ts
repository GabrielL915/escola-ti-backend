import { InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { RefreshTokenRepository } from '../../../domain/repository/refresh-token.repository';
import { InjectKnex } from 'nestjs-knex';

export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createAccount(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      await this.knex('conta')
        .insert({
          id_entregador: id,
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .returning('id');
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar tokens no banco', error);
    }
  }

  async getStoredTokens(id: string): Promise<any> {
    try {
      return await this.knex
        .from('conta')
        .select('refresh_token')
        .where({ id_entregador: id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao recuperar tokens do banco.',
        error,
      );
    }
  }

  async updateAccount(id: string, accessToken: string, refreshToken: string) {
    try {
      return await this.knex('conta')
        .where({ id_entregador: id })
        .update({ refresh_token: refreshToken, access_token: accessToken });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar conta no banco.', error);
    }
  }
}
