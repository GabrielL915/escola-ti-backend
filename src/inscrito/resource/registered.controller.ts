import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateRegisteredDto } from '../domain/dto/create-registered.dto';
import { UpdateRegisteredDto } from '../domain/dto/update-registered.dto';
import { CreateRegisteredUseCase } from '../domain/use-cases/create-Registered.use-cases';
import { UpdateRegisteredUseCase } from '../domain/use-cases/update-registered.use-case';
import { DeleteRegisteredUseCase } from '../domain/use-cases/delete-registered.use-cases';
import { FindRegisteredUseCase } from '../domain/use-cases/find-registered.use-cases';

@ApiTags('registered')
@ApiBearerAuth()
@Controller('registered')
export class RegisteredController {
  constructor(
    private readonly createRegisteredUseCase: CreateRegisteredUseCase,
    private readonly updateRegisteredUseCase: UpdateRegisteredUseCase,
    private readonly deleteRegisteredUseCase: DeleteRegisteredUseCase,
    private readonly findRegisteredUseCase: FindRegisteredUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar entidade' })
  @ApiBody({ type: CreateRegisteredDto, description: 'Dados para registro' })
  @ApiResponse({ status: 201, description: 'Entidade registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async create(@Body() input: CreateRegisteredDto) {
    return this.createRegisteredUseCase.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar registro' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiBody({ type: UpdateRegisteredDto, description: 'Dados para atualização do registro' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async update(
    @Param('id') id: string,
    @Body() input: UpdateRegisteredDto,
  ) {
    return this.updateRegisteredUseCase.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar registro' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  async delete(@Param('id') id: string) {
    return this.deleteRegisteredUseCase.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros' })
  @ApiResponse({ status: 200, description: 'Lista de registros.' })
  async findAll() {
    return this.findRegisteredUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar registro por ID' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.findRegisteredUseCase.findOne(id);
  }
}
