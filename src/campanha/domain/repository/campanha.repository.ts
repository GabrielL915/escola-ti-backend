import { CreateCampanhaDto } from '../dto/create-campanha.dto';
import { Campanha } from '../entities/campanha.entity';

export abstract class CampanhaRepository {
  abstract create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha>;

  abstract findAll(): Promise<Campanha[]>;
}
