import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy';
import { CreateMotoboyDto } from '../domain/dto/create-motoboy.dto';
import { UpdateMotoboyDto } from '../domain/dto/update-motoboy.dto';

@Controller('motoboy')
export class MotoboyController {
  constructor(private readonly updateMotoboyUseCase: UpdateMotoboyUseCase) {}

 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotoboyDto: UpdateMotoboyDto) {
    return this.updateMotoboyUseCase.execute({id, input: updateMotoboyDto});
  }

}
