import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../resource/auth.service';
import { LocalStrategy } from './local.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateEntregador: jest.fn(),
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    mockAuthService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user if  validation is succeful', async () => {
      const mockUser = {
        email: 'emailtest@example.com',
        senha: 'senha123',
      };
      mockAuthService.validateEntregador.mockResolvedValue(mockUser);

      const result = await localStrategy.validate(
        'emailtest@example.com',
        'senha123',
      );

      expect(result).toEqual(mockUser);
    });

    it('should throw an unauthorized exception if validation fails', async () => {
      mockAuthService.validateEntregador.mockResolvedValue(null);

      await expect(localStrategy.validate('', '')).rejects.toThrow(
        UnauthorizedException,
      );

      expect(mockAuthService.validateEntregador).toHaveBeenCalled();
    });
  });
});
