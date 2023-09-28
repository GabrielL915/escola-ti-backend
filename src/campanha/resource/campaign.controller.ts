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

import { CreateCampaignDto } from '../domain/dto/create-campaign.dto';
import { UpdateCampaignDto } from '../domain/dto/update-campaign.dto';
import { CreateCampaignUseCase } from '../domain/use-cases/create-campaign.use-cases';
import { UpdateCampaignUseCase } from '../domain/use-cases/update-campaign.use-case';
import { DeleteCampaignUseCase } from '../domain/use-cases/delete-campaign.use-cases';
import { FindCampaignUseCase } from '../domain/use-cases/find-campaign.use-cases';

@ApiTags('campaign')
@ApiBearerAuth()
@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly createCampaignUseCase: CreateCampaignUseCase,
    private readonly updateCampaignUseCase: UpdateCampaignUseCase,
    private readonly deleteCampaignUseCase: DeleteCampaignUseCase,
    private readonly findCampaignUseCase: FindCampaignUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar campanha' })
  @ApiBody({ type: CreateCampaignDto, description: 'Dados para criação da campanha' })
  @ApiResponse({ status: 201, description: 'Campanha criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.createCampaignUseCase.create(createCampaignDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar campanha' })
  @ApiParam({ name: 'id', description: 'ID da campanha' })
  @ApiBody({ type: UpdateCampaignDto, description: 'Dados para atualização da campanha' })
  @ApiResponse({ status: 200, description: 'Campanha atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.updateCampaignUseCase.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar campanha' })
  @ApiParam({ name: 'id', description: 'ID da campanha' })
  @ApiResponse({ status: 200, description: 'Campanha deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada.' })
  async delete(@Param('id') id: string) {
    return this.deleteCampaignUseCase.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as campanhas' })
  @ApiResponse({ status: 200, description: 'Lista de campanhas.' })
  async findAll() {
    return this.findCampaignUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar campanha por ID' })
  @ApiParam({ name: 'id', description: 'ID da campanha' })
  @ApiResponse({ status: 200, description: 'Campanha encontrada.' })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada.' })
  async findOne(@Param('id') id: string) {
    return this.findCampaignUseCase.findOne(id);
  }
}
