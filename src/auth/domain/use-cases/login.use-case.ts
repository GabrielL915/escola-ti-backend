import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
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
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel() private knex: Knex,
  ) {}

  async login({ email, senha }: LoginDto) {
    try {
      const entregador = await this.validateEntregador(email, senha);
      const payload = { email: entregador.email, sub: entregador.id };
      const tokens = await this.generateToken(payload.sub, payload.email);
      return tokens;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno do servidor.', error);
    }
  }

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
            expiresIn: '15m',
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
      throw new InternalServerErrorException('Erro ao gerar token.', error);
    }
  }

  async validateEntregador(email: string, senha: string): Promise<LoginDto> {
    try {
      const entregador = await this.knex
        .first('senha', 'email', 'ativo', 'id')
        .from('entregador')
        .where('email', email);

      if (!entregador) {
        throw new NotFoundException('entregador não encontrado');
      }
      const validPassword = this.comparePassword(entregador.senha, senha);

      if (!validPassword) {
        throw new NotFoundException('entregador não encontrado ou inativo',);
      }
      return entregador;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao validar entregador.', error);
    }
  }

  private comparePassword(storedPassword: string, inputPassword: string) {
    try {
      if (!storedPassword.includes('.')) {
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
      throw new UnauthorizedException('Erro ao comparar senhas.', error);
    }
  }
}
