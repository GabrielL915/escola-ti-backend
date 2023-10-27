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

import { CreateSubscribeDto } from '../domain/dto/create-subscribe.dto';
import { UpdateSubscribeDto } from '../domain/dto/update-subscribe.dto';
import { CreateSubscribeUseCase } from '../domain/use-cases/create-subscribe.use-cases';
import { UpdateSubscribeUseCase } from '../domain/use-cases/update-subscribe.use-cases';
import { DeleteSubscribeUseCase } from '../domain/use-cases/delete-subscribe.use-cases';
import { FindSubscribeUseCase } from '../domain/use-cases/find-subscribe.use-cases';

//INSCRITO
@ApiTags('subscribe')
@ApiBearerAuth()
@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly createSubscribeUseCase: CreateSubscribeUseCase,
    private readonly updateSubscribeUseCase: UpdateSubscribeUseCase,
    private readonly deleteSubscribeUseCase: DeleteSubscribeUseCase,
    private readonly findSubscribeUseCase: FindSubscribeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar entidade' })
  @ApiBody({ type: CreateSubscribeDto, description: 'Dados para registro' })
  @ApiResponse({ status: 201, description: 'Entidade registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async create(@Body() input: CreateSubscribeDto) {
    return this.createSubscribeUseCase.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar registro' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiBody({ type: UpdateSubscribeDto, description: 'Dados para atualização do registro' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async update(
    @Param('id') id: string,
    @Body() input: UpdateSubscribeDto,
  ) {
    return this.updateSubscribeUseCase.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar registro' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  async delete(@Param('id') id: string) {
    return this.deleteSubscribeUseCase.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros' })
  @ApiResponse({ status: 200, description: 'Lista de registros.' })
  async findAll() {
    return this.findSubscribeUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar registro por ID' })
  @ApiParam({ name: 'id', description: 'ID do registro' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.findSubscribeUseCase.findOne(id);
  }
}
