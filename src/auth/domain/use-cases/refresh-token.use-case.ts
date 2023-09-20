import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { LoginUseCase } from './login.use-case';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async refreshToken(motoboyId: string, refreshToken: string) {
    try {
      const storedTokens = await this.refreshTokenRepository.getStoredTokens(
        motoboyId,
      );

      if (!storedTokens) {
        throw new NotFoundException('Token não encontrado');
      }
      const [email] = await this.getMotoboy(motoboyId);
      const { access_token, refresh_token } =
        await this.loginUseCase.generateToken(motoboyId, email);

      await this.refreshTokenRepository.updateAccount(
        motoboyId,
        access_token,
        refresh_token,
      );
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
}
