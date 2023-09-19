import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { RefreshTokenRepository } from '../../../domain/repository/refresh-token.repository';

export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

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
      throw new InternalServerErrorException('Erro ao salvar tokens', error);
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
        'Erro ao recuperar tokens.',
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
      throw new InternalServerErrorException('Erro ao atualizar conta.', error);
    }
  }
}
