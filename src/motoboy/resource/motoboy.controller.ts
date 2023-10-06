import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateMotoboyDto } from '../domain/dto/create-motoboy.dto';
import { UpdateMotoboyDto } from '../domain/dto/update-motoboy.dto';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@Controller('motoboy')
export class MotoboyController {
  constructor(
    private readonly createMotoboyUseCase: CreateMotoboyUseCase,
    private readonly findAllMotoboyUseCase: FindAllMotoboyUseCase,
    private readonly findByIdMotoboyUseCase: FindByIdMotoboyUseCase,
    private readonly updateMotoboyUseCase: UpdateMotoboyUseCase,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() input: CreateMotoboyDto) {
    return this.createMotoboyUseCase.create(input);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.findAllMotoboyUseCase.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdMotoboyUseCase.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateMotoboyDto) {
    return this.updateMotoboyUseCase.update( id, input );
  }
}
