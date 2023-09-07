import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            singIn: jest.fn() as jest.MockedFunction<AuthService['singIn']>,
            singUp: jest.fn() as jest.MockedFunction<AuthService['singUp']>,
            getProfile: jest.fn() as jest.MockedFunction<AuthService['getProfile']>,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService) as unknown as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('singIn', () => {
    it('should return tokens when login is successful with valid email and password', async () => {
      const loginDto = { email: 'test@test.com', senha: '12345678' };
      const responseData = { access_token: 'token123', refresh_token: 'refreshToken123' };

      service.singIn.mockResolvedValue(responseData);

      expect(await controller.singIn(loginDto)).toEqual(responseData);
    });

    it('should throw UnauthorizedException when email format is invalid', async () => {
      const loginDto = { email: 'testtest.com', senha: '12345678' };

      service.singIn.mockRejectedValue(new UnauthorizedException());

      await expect(controller.singIn(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is too short', async () => {
      const loginDto = { email: 'test@test.com', senha: '12345' };

      service.singIn.mockRejectedValue(new UnauthorizedException());

      await expect(controller.singIn(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('create', () => {
    it('should not throw when registration is successful', async () => {
      const singUpDto = {
        nome: 'João',
        sobrenome: 'Silva',
        CPF: '000.000.000-00',
        CNPJ: '00.000.000/0000-00',
        email: 'test@test.com',
        telefone: '(00) 00000-0000',
        data_de_nascimento: '1999-01-01',
        senha: '12345678',
        mochila: true,
        data_de_cadastro: '2021-01-01'
      };

      expect(() => controller.create(singUpDto)).not.toThrow();
    });

    it('should throw UnauthorizedException when registration data is invalid', async () => {
      const singUpDto = {
        nome: 'João',
        sobrenome: 'Silva',
        CPF: '000.000.000-00',
        CNPJ: '00.000.000/0000-00',
        email: 'test@test.com',
        telefone: '(00) 00000-0000',
        data_de_nascimento: '1999-01-01',
        senha: '',  // Invalid password
        mochila: true,
        data_de_cadastro: '2021-01-01'
      };

      service.singUp.mockRejectedValue(new UnauthorizedException());

      await expect(controller.create(singUpDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return profile data when email is valid', async () => {
      const email = 'test@test.com';
      const fullResponseData = {
        nome: 'João',
        sobrenome: 'Silva',
        CPF: '000.000.000-00',
        CNPJ: '00.000.000/0000-00',
        email: 'test@test.com',
        telefone: '(00) 00000-0000',
        data_de_nascimento: '1999-01-01',
        senha: '12345678',
        mochila: true,
        data_de_cadastro: '2021-01-01'
      };
  
      const expectedResponse = {
        nome: 'João',
        sobrenome: 'Silva',
        email: 'test@test.com',
        telefone: '(00) 00000-0000',
        data_de_nascimento: '1999-01-01',
        mochila: true,
        data_de_cadastro: '2021-01-01'
      };
  
      service.getProfile.mockResolvedValue(fullResponseData);
  
      expect(await controller.getProfile(email)).toEqual(expectedResponse);
    });
  
    it('should throw NotFoundException when email is invalid', async () => {
      const email = 'invalid@test.com';
  
      service.getProfile.mockRejectedValue(new NotFoundException());
  
      await expect(controller.getProfile(email)).rejects.toThrow(NotFoundException);
    });
  });
});
