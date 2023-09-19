import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateObjetivoDto } from '../domain/dto/create-objetivo.dto';
import { UpdateObjetivoDto } from '../domain/dto/update-objetivo.dto';

import { CreateObjetivoUseCase } from '../domain/use-cases/create-objetivo.use-cases';
import { UpdateObjetivoUseCase } from '../domain/use-cases/update-objetivo.use-case';
import { DeleteObjetivoUseCase } from '../domain/use-cases/delete-objetivo.use-cases';
import { FindObjetivoUseCase } from '../domain/use-cases/find-objetivo.use-cases';

@Controller('objetivo')
export class ObjetivoController {
  constructor(
    private readonly createObjetivoUseCase: CreateObjetivoUseCase,
    private readonly updateObjetivoUseCase: UpdateObjetivoUseCase,
    private readonly deleteObjetivoUseCase: DeleteObjetivoUseCase,
    private readonly findObjetivoUseCase: FindObjetivoUseCase,
  ) {}

  @Post()
  async create(@Body() createObjetivoDto: CreateObjetivoDto) {
    return this.createObjetivoUseCase.create(createObjetivoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateObjetivoDto: UpdateObjetivoDto,
  ) {
    return this.updateObjetivoUseCase.update(id, updateObjetivoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteObjetivoUseCase.delete(id);
  }

  @Get()
  async findAll() {
    return this.findObjetivoUseCase.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findObjetivoUseCase.findOne(id);
  }
}
