import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  signIn: jest.fn(),
  signUp: jest.fn(),
  getProfile: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call signIn with correct params and return the result', async () => {
      const loginDto = { email: 'test@email.com', senha: 'password' };
      mockAuthService.signIn.mockResolvedValueOnce({
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
      });

      const result = await controller.login(loginDto);

      expect(mockAuthService.signIn).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual({
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
      });
    });
  });

  describe('register', () => {
    it('should call signUp with correct params and return the result', async () => {
      const signUpDto = {
        nome: 'Gabriel',
        sobrenome: 'Roman',
        CPF: '123456789',
        CNPJ: '123456789',
        email: 'emailtest@example.com',
        telefone: '123456789',
        data_de_nascimento: '1999-01-01',
        senha: 'password123',
        mochila: true,
        data_de_cadastro: '2021-01-01',
      };
      mockAuthService.signUp.mockResolvedValueOnce({});

      const result = await controller.create(signUpDto);

      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(result).toEqual({});
    });
  });

  describe('getProfile', () => {
    it('should call getProfile with correct params and return the result', async () => {
      const email = 'test@email.com';
      const responseDto = {
        nome: 'Gabriel',
        sobrenome: 'Roman',
        email: 'emailtest@example.com',
        telefone: '123456789',
        data_de_nascimento: '1999-01-01',
        mochila: true,
        data_de_cadastro: '2021-01-01',
      };
      mockAuthService.getProfile.mockResolvedValueOnce(responseDto);

      const result = await controller.getProfile(email);

      expect(mockAuthService.getProfile).toHaveBeenCalledWith(email);
      expect(result).toEqual(responseDto);
    });
  });
});
