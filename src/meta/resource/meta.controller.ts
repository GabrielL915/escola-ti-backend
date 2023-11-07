import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Query,
  InternalServerErrorException,
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

@ApiTags('meta')
@ApiBearerAuth()
@Controller('meta')
export class MetaController {
  constructor(
    private readonly createMetaUseCase: CreateMetaUseCase,
    private readonly updateMetaUseCase: UpdateMetaUseCase,
    private readonly deleteMetaUseCase: DeleteMetaUseCase,
    private readonly findMetaUseCase: FindMetaUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova Meta' })
  @ApiBody({ type: CreateMetaDto, description: 'Dados da Meta a ser criada' })
  @ApiResponse({ status: 201, description: 'Meta criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async create(@Body() input: CreateMetaDto) {
    try {
      return await this.createMetaUseCase.create(input);
    } catch (error) {
      if (error.message === 'Meta já cadastrada para o inscrito e objetivo informados.') {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Erro ao criar Meta', error);
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar uma Meta existente' })
  @ApiParam({
    name: 'id_objetivo',
    description: 'ID do Objetivo da Meta a ser atualizada',
  })
  @ApiParam({
    name: 'id_inscrito',
    description: 'ID do Inscrito da Meta a ser atualizada',
  })
  @ApiBody({ type: UpdateMetaDto, description: 'Dados atualizados da Meta' })
  @ApiResponse({ status: 200, description: 'Meta atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  @ApiResponse({ status: 400, description: 'Entrada inválida.' })
  async update(
    @Query('id_objetivo') idObjetivo: string,
    @Query('id_inscrito') idInscrito: string,
    @Body() input: UpdateMetaDto,
  ) {
    return this.updateMetaUseCase.update(idObjetivo, idInscrito, input);
  }

  @Delete()
  @ApiOperation({ summary: 'Excluir uma Meta' })
  @ApiParam({
    name: 'id_objetivo',
    description: 'ID do Objetivo da Meta a ser excluída',
  })
  @ApiParam({
    name: 'id_inscrito',
    description: 'ID do Inscrito da Meta a ser excluída',
  })
  @ApiResponse({ status: 200, description: 'Meta excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  async delete(
    @Query('id_objetivo') idObjetivo: string,
    @Query('id_inscrito') idInscrito: string,
  ) {
    return this.deleteMetaUseCase.delete(idObjetivo, idInscrito);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as Metas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Metas',
    type: [CreateMetaDto],
  })
  async findAll() {
    return this.findMetaUseCase.findAll();
  }

  @Get('specific')
  @ApiOperation({ summary: 'Buscar uma Meta específica' })
  @ApiParam({
    name: 'id_objetivo',
    description: 'ID do Objetivo da Meta a ser recuperada',
  })
  @ApiParam({
    name: 'id_inscrito',
    description: 'ID do Inscrito da Meta a ser recuperada',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da Meta',
    type: CreateMetaDto,
  })
  @ApiResponse({ status: 404, description: 'Meta não encontrada.' })
  async findOne(
    @Query('id_objetivo') idObjetivo: string,
    @Query('id_inscrito') idInscrito: string,
  ) {
    return this.findMetaUseCase.findOne(idObjetivo, idInscrito);
  }
}
