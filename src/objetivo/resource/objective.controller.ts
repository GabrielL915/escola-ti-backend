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
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateObjectiveDto } from '../domain/dto/create-objective.dto';
import { UpdateObjectiveDto } from '../domain/dto/update-objective.dto';
import { CreateObjectiveUseCase } from '../domain/use-cases/create-objective.use-cases';
import { UpdateObjectiveUseCase } from '../domain/use-cases/update-objective.use-case';
import { DeleteObjectiveUseCase } from '../domain/use-cases/delete-objective.use-cases';
import { FindObjectiveUseCase } from '../domain/use-cases/find-objective.use-cases';

@ApiTags('Objective')
@ApiBearerAuth()
@Controller('objective')
export class ObjectiveController {
  constructor(
    private readonly createObjectiveUseCase: CreateObjectiveUseCase,
    private readonly updateObjectiveUseCase: UpdateObjectiveUseCase,
    private readonly deleteObjectiveUseCase: DeleteObjectiveUseCase,
    private readonly findObjectiveUseCase: FindObjectiveUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo Objetivo' })
  @ApiBody({ type: CreateObjectiveDto, description: 'Dados do Objetivo a ser criado' })
  @ApiResponse({ status: 201, description: 'Objetivo criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async create(@Body() createObjectiveDto: CreateObjectiveDto) {
    return this.createObjectiveUseCase.create(createObjectiveDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Objetivo existente' })
  @ApiParam({ name: 'id', description: 'ID do Objetivo para atualizar' })
  @ApiBody({ type: UpdateObjectiveDto, description: 'Dados atualizados do Objetivo' })
  @ApiResponse({ status: 200, description: 'Objetivo atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Objetivo não encontrado.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async update(
    @Param('id') id: string,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.updateObjectiveUseCase.update(id, updateObjectiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um Objetivo' })
  @ApiParam({ name: 'id', description: 'ID do Objetivo para excluir' })
  @ApiResponse({ status: 200, description: 'Objetivo excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Objetivo não encontrado.' })
  async delete(@Param('id') id: string) {
    return this.deleteObjectiveUseCase.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os Objetivos' })
  @ApiResponse({ status: 200, description: 'Lista de Objetivos', type: [CreateObjectiveDto] })
  async findAll() {
    return this.findObjectiveUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um Objetivo específico' })
  @ApiParam({ name: 'id', description: 'ID do Objetivo a ser recuperado' })
  @ApiResponse({ status: 200, description: 'Detalhes do Objetivo', type: CreateObjectiveDto })
  @ApiResponse({ status: 404, description: 'Objetivo não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.findObjectiveUseCase.findOne(id);
  }
}
