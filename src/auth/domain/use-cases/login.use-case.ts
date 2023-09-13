import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { timingSafeEqual } from 'crypto';
import { generateJwtToken } from '../../util/generate-jwt-token';
import { hashPassword } from '../../util/hash-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel() private knex: Knex,
  ) {}

  async execute({ email, senha }: LoginDto) {
    try {
      const entregador = await this.validateEntregador(email, senha);
      const payload = { email: entregador.email, sub: entregador.senha };
      const generateTokenService = generateJwtToken(this.jwtService);
      const { access_token, refresh_token } = generateTokenService(payload);
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async validateEntregador(email: string, senha: string): Promise<LoginDto> {
    const entregador = await this.knex
      .first('senha', 'email', 'ativo')
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
