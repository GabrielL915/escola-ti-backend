import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateMotoboyDto } from '../domain/dto/create-motoboy.dto';
import { UpdateMotoboyRequestDto } from '../domain/dto/update-motoboy-request.dto';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { DeleteMotoboyUseCase } from '../domain/use-cases/delete-motoboy.use-case';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@Controller('motoboy')
export class MotoboyController {
  constructor(
    private readonly createMotoboyUseCase: CreateMotoboyUseCase,
    private readonly findAllMotoboyUseCase: FindAllMotoboyUseCase,
    private readonly findByIdMotoboyUseCase: FindByIdMotoboyUseCase,
    private readonly updateMotoboyUseCase: UpdateMotoboyUseCase,
    private readonly deleteMotoboyUseCase: DeleteMotoboyUseCase,
  ) {}

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
  @Get('findOne')
  findOne(@Req() req: Request) {
    const id = req['user'].sub;
    return this.findByIdMotoboyUseCase.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update')
  update(@Req() req: Request, @Body() input: UpdateMotoboyRequestDto) {
    const id = req['user'].sub;
    return this.updateMotoboyUseCase.update( id, input );
  }

  @Delete('delete')
  delete(@Param('id') id: string) {
    return this.deleteMotoboyUseCase.delete(id);
  }
}
