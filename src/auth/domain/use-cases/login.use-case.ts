import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { timingSafeEqual } from 'crypto';
import { hashPassword } from '../../util/hash-password';
import { JwtService } from '@nestjs/jwt';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel() private knex: Knex,
  ) {}

  async execute({ email, senha }: LoginDto) {
    try {
      const entregador = await this.validateEntregador(email, senha);
      const payload = { email: entregador.email, sub: entregador.id };
      const tokens = this.generateToken(payload.sub, payload.email);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async generateToken(id: string, email: string) {
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
  }

  async validateEntregador(email: string, senha: string): Promise<LoginDto> {
    const entregador = await this.knex
      .first('senha', 'email', 'ativo', 'id')
      .from('entregador')
      .where('email', email);

    if (!entregador) {
      throw new NotFoundException('entregador não encontrado');
    }
    const validPassword = this.comparePassword(entregador.senha, senha);

    if (!validPassword) {
      throw new NotFoundException('entregador não encontrado ou inativo');
    }
    return entregador;
  }

  private comparePassword(storedPassword: string, inputPassword: string) {
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
  }
}
