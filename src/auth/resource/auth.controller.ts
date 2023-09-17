import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RegisterDto } from '../domain/dto/register.dto';
import {
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from '../domain/dto/login.dto';
import { AuthResponseDto } from '../domain/dto/auth-response.dto';
import { RegisterUseCase } from '../domain/use-cases/register.use-case';
import { LoginUseCase } from '../domain/use-cases/login.use-case';
import { ProfileUseCase } from '../domain/use-cases/profile.use-case';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { SmsUseCase } from '../domain/use-cases/sms.use-case';
import { RefreshTokenUseCase } from '../domain/use-cases/refresh-token.use-case';
@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly profileUseCase: ProfileUseCase,
    private readonly smsUseCase: SmsUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('sendNumber')
  generateCode(@Body() body: { telefone: string }) {
    return this.smsUseCase.generateCode(body.telefone);
  }

  @Post('validateCode')
  validateCode(@Body() body: { telefone: string; codigo: number }) {
    return this.smsUseCase.validateCode(body.telefone, body.codigo);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: InternalServerErrorException,
  })
  @ApiBody({
    description: 'Login payload',
    type: LoginDto,
    required: true,
  })
  login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.login(loginDto);
  }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    type: RegisterDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: InternalServerErrorException,
  })
  @ApiBody({
    description: 'Register payload',
    type: RegisterDto,
    required: true,
  })
  create(@Body() createCadastroDto: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUseCase.register(createCadastroDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile/:email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna o perfil do entregador',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: InternalServerErrorException,
  })
  @ApiParam({
    name: 'email',
    description: 'E-mail do entregador',
    type: String,
    required: true,
    example: 'teste@gmail.com',
  })
  getProfile(@Param('email') email: string) {
    return this.profileUseCase.profile(email);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  getRefreshToken(@Req() req: Request) {
    const motoboyId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.refreshTokenUseCase.refreshToken(motoboyId, refreshToken);
  }
}
