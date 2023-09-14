import { Controller, Post, Body } from '@nestjs/common';
import { CampanhaService } from '../campanha.service';
import { CreateCampanhaDto } from '../domain/dto/create-campanha.dto';

@Controller('campanha')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Post()
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhaService.create(createCampanhaDto);
  }
}
