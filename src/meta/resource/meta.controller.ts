import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateMetaDto } from '../domain/dto/create-meta.dto';
import { UpdateMetaDto } from '../domain/dto/update-meta.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateMetaUseCase } from '../domain/use-cases/create-meta.use-cases';
import { UpdateMetaUseCase } from '../domain/use-cases/update-meta.use-case';
import { DeleteMetaUseCase } from '../domain/use-cases/delete-meta.use-cases';
import { FindMetaUseCase } from '../domain/use-cases/find-meta.use-cases';

@ApiTags('Meta')
@ApiBearerAuth()
@Controller('Meta')
export class MetaController {
  constructor(
    private readonly createMetaUseCase: CreateMetaUseCase,
    private readonly updateMetaUseCase: UpdateMetaUseCase,
    private readonly deleteMetaUseCase: DeleteMetaUseCase,
    private readonly findMetaUseCase: FindMetaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova Meta' })
  @ApiBody({ type: CreateMetaDto, description: 'Dados da Meta a ser criada' })
  @ApiResponse({ status: 201, description: 'Meta criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async create(@Body() createMetaDto: CreateMetaDto) {
    return this.createMetaUseCase.create(createMetaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma Meta existente' })
  @ApiParam({ name: 'id', description: 'ID da Meta para atualizar' })
  @ApiBody({ type: UpdateMetaDto, description: 'Dados atualizados da Meta' })
  @ApiResponse({ status: 200, description: 'Meta atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async update(
    @Param('id') id: string,
    @Body() updateMetaDto: UpdateMetaDto,
  ) {
    return this.updateMetaUseCase.update(id, updateMetaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma Meta' })
  @ApiParam({ name: 'id', description: 'ID da Meta para excluir' })
  @ApiResponse({ status: 200, description: 'Meta excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  async delete(@Param('id') id: string) {
    return this.deleteMetaUseCase.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as Metas' })
  @ApiResponse({ status: 200, description: 'Lista de Metas', type: [CreateMetaDto] })
  async findAll() {
    return this.findMetaUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma Meta específica' })
  @ApiParam({ name: 'id', description: 'ID da Meta a ser recuperada' })
  @ApiResponse({ status: 200, description: 'Detalhes da Meta', type: CreateMetaDto })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  async findOne(@Param('id') id: string) {
    return this.findMetaUseCase.findOne(id);
  }
}
