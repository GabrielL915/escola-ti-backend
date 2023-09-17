import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { timingSafeEqual } from 'crypto';
import { hashPassword } from '../../util/hash-password';
import { JwtService } from '@nestjs/jwt';
import { readFileSync } from 'fs';

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel() private knex: Knex,
  ) {}

  async login({ email, senha }: LoginDto) {
    try {
      const entregador = await this.validateEntregador(email, senha);
      const payload = { email: entregador.email, sub: entregador.id };
      const tokens = await this.generateToken(payload.sub, payload.email);
      await this.saveTokens(
        payload.sub,
        tokens.access_token,
        tokens.refresh_token,
      );
      return tokens;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      this.logger.error(
        `Erro ao realizar login para o email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Erro ao realizar login.', error);
    }
  }


  //util
  async generateToken(id: string, email: string) {
    try {
      const { privateKey: PRIVATE_KEY } = JSON.parse(
        readFileSync('keys.json', 'utf8'),
      );
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: PRIVATE_KEY,
            expiresIn: '20s',
            algorithm: 'RS256',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: PRIVATE_KEY,
            expiresIn: '7d',
            algorithm: 'RS256',
          },
        ),
      ]);
      return { access_token, refresh_token };
    } catch (error) {
      this.logger.error(`Erro ao gerar token para o email: ${email}`, error);
      throw new InternalServerErrorException(
        `Erro ao gerar token para o email: ${email}`,
        error,
      );
    }
  }

  async saveTokens(id: string, accessToken: string, refreshToken: string) {
    try {
      await this.knex('account')
        .insert({
          id_entregador: id,
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .returning('id');
    } catch (error) {
      this.logger.error('Erro ao salvar tokens');
      throw new InternalServerErrorException('Erro ao salvar tokens', error);
    }
  }

  async validateEntregador(email: string, senha: string): Promise<LoginDto> {
    try {
      const entregador = await this.knex
        .first('senha', 'email', 'ativo', 'id')
        .from('entregador')
        .where('email', email);

      if (!entregador) {
        this.logger.error(`Entregador não encontrado para o email: ${email}`);
        throw new NotFoundException('Entregador não encontrado.');
      }
      const validPassword = this.comparePassword(entregador.senha, senha);

      if (!validPassword) {
        this.logger.error(`Senha incorreta para o email: ${email}`);
        throw new UnauthorizedException('Senha incorreta ou entregador inativo.');
      }
      return entregador;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Erro ao validar entregador para o email: ${email}`);
      throw new InternalServerErrorException(
        'Erro ao validar entregador.',
        error,
      );
    }
  }

  private comparePassword(storedPassword: string, inputPassword: string) {
    try {
      if (!storedPassword.includes('.')) {
        this.logger.error('Senha armazenada em formato inválido');
        throw new UnauthorizedException('Senha armazenada em formato inválido');
      }
      const [salt, hash] = storedPassword.split('.');
      const hashedInput = hashPassword(inputPassword, salt);
      const match = timingSafeEqual(
        Buffer.from(hashedInput.split('.')[1], 'hex'),
        Buffer.from(hash, 'hex'),
      );
      return match;
    } catch (error) {
      this.logger.error('Erro ao comparar senhas', error);
      throw new UnauthorizedException('Erro ao comparar senhas.', error);
    }
  }
}
