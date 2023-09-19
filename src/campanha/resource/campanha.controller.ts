import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateCampanhaDto } from '../domain/dto/create-campanha.dto';
import { UpdateCampanhaDto } from '../domain/dto/update-campanha.dto';

import { CreateCampanhaUseCase } from '../domain/use-cases/create-campanha.use-cases';
import { UpdateCampanhaUseCase } from '../domain/use-cases/update-campanha.use-case';
import { DeleteCampanhaUseCase } from '../domain/use-cases/delete-campanha.use-cases';
import { FindCampanhaUseCase } from '../domain/use-cases/find-campanha.use-cases';

@Controller('campanha')
export class CampanhaController {
  constructor(
    private readonly createCampanhaUseCase: CreateCampanhaUseCase,
    private readonly updateCampanhaUseCase: UpdateCampanhaUseCase,
    private readonly deleteCampanhaUseCase: DeleteCampanhaUseCase,
    private readonly findCampanhaUseCase: FindCampanhaUseCase,
  ) {}

  @Post()
  async create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.createCampanhaUseCase.create(createCampanhaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ) {
    return this.updateCampanhaUseCase.update(id, updateCampanhaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteCampanhaUseCase.delete(id);
  }

  @Get()
  async findAll() {
    return this.findCampanhaUseCase.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findCampanhaUseCase.findOne(id);
  }
}
