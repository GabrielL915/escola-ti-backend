import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { MotoboyRepository } from '../../../motoboy/domain/repository/motoboy.repository';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/login.dto';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockRefreshTokenRepo: Partial<RefreshTokenRepository>;
  let mockMotoboyRepo: Partial<MotoboyRepository>;
  let mockJwtService: Partial<JwtService>;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(async () => {
    mockRefreshTokenRepo = {
      createAccount: jest.fn(),
    };
    mockMotoboyRepo = {
      findByEmail: jest.fn(),
    };
    mockJwtService = {
      signAsync: jest.fn(),
    };
    mockConfigService = {
      get: jest.fn().mockReturnValue('KEY'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: RefreshTokenRepository, useValue: mockRefreshTokenRepo },
        { provide: MotoboyRepository, useValue: mockMotoboyRepo },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  it('should throw a NotFoundException when the user is not found', async () => {
    const mockLoginDto: LoginDto = { id: '001' ,email: 'joao.almeida@example.com', senha: 'senha123' };
    (mockMotoboyRepo.findByEmail as jest.Mock).mockResolvedValueOnce(null);

    await expect(loginUseCase.login(mockLoginDto)).rejects.toThrow(NotFoundException);
  });
});
