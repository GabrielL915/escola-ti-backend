import { Body, Controller, Post, HttpCode, HttpStatus, Get, Param, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from '../dto/singup.dto';
import {
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('singin')
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
    return this.authService.signIn(
      loginDto
    );
  }

  @Post('singup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    type: SingUpDto,
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
    description: 'SingUp payload',
    type: SingUpDto,
    required: true,
  })
  create(@Body() createCadastroDto: SingUpDto) {
    return this.authService.signUp(createCadastroDto);
  }

  @Get('profile:email')
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
  }
}
