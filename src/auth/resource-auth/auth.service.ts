import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { generateJWTFactory } from '../factories/jwt.factory';
import { SingUpDto } from '../dto/singup.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { instanceToPlain } from 'class-transformer';

/*  Todo:
  - teste unitarios
  - alterar dados */
@Injectable()
export class AuthService {
  private jwtKeyPair: { privateKey: string; publicKey: string };
  private invalidTokens: string[] = [];

  constructor(
    private jwtService: JwtService,
    @InjectModel() private knex: Knex,
  ) {
    this.jwtKeyPair = generateJWTFactory();
    this.jwtService = new JwtService({
      privateKey: this.jwtKeyPair.privateKey,
      signOptions: { algorithm: 'RS256' },
    });
  }

  async signIn({ email, senha }: LoginDto) {
    try {
      const entregador = await this.validateEntregador(email, senha);
      const payload = { email: entregador.email, sub: entregador.senha };
      const { access_token, refresh_token } = this.generateJwtToken(payload);
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async signUp(createCadastroDto: SingUpDto): Promise<void> {
    try {
      const hashedPassword = this.hashSenha(createCadastroDto.senha);
      console.log('hashedPassword: ', hashedPassword);
      const newRegister = { ...createCadastroDto, senha: hashedPassword };
      await this.knex('entregador').insert(newRegister);
      console.log('Entregador: ', newRegister);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async getProfile(email: string): Promise<AuthResponseDto> {
    const fullProfile = await this.knex
      .from('entregador')
      .where({ email: email });
    console.log(instanceToPlain(fullProfile) as AuthResponseDto);
    return instanceToPlain(fullProfile) as AuthResponseDto;
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

  private generateJwtToken(payload: { email: string; sub: string }) {
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  private comparePassword(storedPassword: string, inputPassword: string) {
    if (!storedPassword.includes('.')) {
      throw new UnauthorizedException('Senha armazenada em formato inválido');
    }

    const [salt, hash] = storedPassword.split('.');
    const hashedInput = this.hashSenha(inputPassword, salt);

    const match = timingSafeEqual(
      Buffer.from(hashedInput.split('.')[1], 'hex'),
      Buffer.from(hash, 'hex'),
    );
    console.log(match);
    return match;
  }

  private hashSenha(senha: string, saltCarregado?: string) {
    const salt = saltCarregado
      ? Buffer.from(saltCarregado, 'hex')
      : randomBytes(16);

    const hash = scryptSync(senha, salt, 10);

    return `${salt.toString('hex')}.${hash.toString('hex')}`;
  }

  async refresh(refresh_token: string) {
    const payload = this.jwtService.verify(refresh_token);
    if (this.invalidTokens.includes(payload.sub)) {
      throw new UnauthorizedException('refresh token inválido');
    }
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    return { access_token };
  }

  async logout(refresh_token: string) {
    const payload = this.jwtService.verify(refresh_token);
    this.invalidTokens.push(payload.sub);
  }
}
