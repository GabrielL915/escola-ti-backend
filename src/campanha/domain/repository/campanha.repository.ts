import { CreateCampanhaDto } from '../dto/create-campanha.dto';
import { Campanha } from '../entities/campanha.entity';

export abstract class CampanhaRepository {
  abstract create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha>;

  abstract update(id: number, campanha: Campanha): Promise<Campanha>;

  abstract delete(id: number): Promise<void>;

  abstract findAll(): Promise<Campanha[]>;

  abstract findOne(id: number): Promise<Campanha>;
}
