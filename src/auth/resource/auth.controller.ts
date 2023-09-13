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
} from '@nestjs/common';
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

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

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
    return this.loginUseCase.execute(loginDto);
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
    return this.registerUseCase.execute(createCadastroDto);
  }
/* 
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
  getProfile(@Param('email') email: string): Promise<AuthResponseDto> {
    return this.authService.getProfile(email);
  } */
}
